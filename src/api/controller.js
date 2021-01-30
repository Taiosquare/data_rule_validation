let Functions = require("./functions");

exports.details = (req, res) => {
    let personalData = {
        name: "Joshua Osaigbovo",
        github: "@taiosquare",
        email: "vikkyjoe5@gmail.com",
        mobile: "07012583701",
    };

    res.json({
        message: "My Rule-Validation API",
        status: "success",
        data: personalData
    })
};

exports.validateRule = (req, res) => {
    try {
        let { rule, data } = req.body;

        (!rule && !data) && Functions.errorResponse(res, "Invalid JSON payload passed.");

        !rule && Functions.errorResponse(res, "rule is required.");

        !data && Functions.errorResponse(res, "data is required.");

        (typeof rule != "object") && Functions.errorResponse(res, "rule should be an object.");
    
        ((typeof data != ("object")) && (typeof data != ("string")) && (!Array.isArray(data)))
            && Functions.errorResponse(res, "data should be an object, array or string.");

        (Functions.dataFieldCheck(rule, data) == false)
            && Functions.errorResponse(res, `field ${rule.field} is missing from data.`);
        
        let response = Functions.validityCheck(rule, data);
    
        if (response.condition == true) {
            Functions.validityResponse(
                `field ${rule.field} successfully validated.`, "success", false,
                response.fieldValue, rule, res, 200
            );
        } else {
            Functions.validityResponse(
                `field ${rule.field} failed validation.`, "error", true,
                response.fieldValue, rule, res, 400
            );
        }
    } catch (error) {
        res.status(400).json({
            error: "An error occurred while trying to validate the rule, please try again"
        });
    }
};


