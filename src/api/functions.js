const errorResponse = (res, errorMessage) => {
    res.status(400).json({
        message: errorMessage,
        status: "error",
        data: null
    });
}

const validityResponse = (message, status, condition, value, rule, res, code) => {
    res.status(code).json({
        message: message,
        status: status,
        data: {
            validation: {
                error: condition,
                field: rule.field,
                field_value: value,
                condition: rule.condition,
                condition_value: rule.condition_value
            }
        }
    });
}

const dataFieldCheck = (rule, data) => { 
    let check = false;
    
    if (Array.isArray(data)) {
        if (!(rule.field > data.length - 1)) {
            check = true;
        } 
    } else if (typeof data == "string") {
        if (!(rule.field > data.length)) {
            check = true;
        } 
    } else if (typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (key == rule.field) {
                check = true;
            }
        });
    } 
    
    return check;
}

const conditionCheck = (dataField, condition, conditionValue) => {
    let check = false;

    if (condition == "eq") {
        if (dataField == conditionValue) {
            check = true;
        }
    } else if (condition == "neq") {
        if (dataField != conditionValue) {
            check = true;
        }
    } else if (condition == "gt") {
        if (dataField > conditionValue) {
            check = true;
        }
    } else if (condition == "gte") {
        if (dataField >= conditionValue) {
            check = true;
        }
    } else if (condition == "contains") {
        if (dataField.includes(conditionValue)) {
            check = true;
        }
    }

    return check;
}

const validityCheck = (rule, data) => {
    let check = {
        condition: false
    };

    if ((Array.isArray(data)) || (typeof data == "string")) {
        if (conditionCheck(data[rule.field], rule.condition, rule.condition_value) == true) {
            check.condition = true;
            check.fieldValue = data[rule.field];
        } else {
            check.fieldValue = data[rule.field];
        }
    } else if (typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (key == rule.field) {
                if (conditionCheck(data[key], rule.condition, rule.condition_value) == true) {
                    check.condition = true;
                    check.fieldValue = data[key];
                } else {
                    check.fieldValue = data[key];
                }
            }
        });
    } 

    return check;
}

module.exports.errorResponse = errorResponse;
module.exports.dataFieldCheck = dataFieldCheck;
module.exports.validityResponse = validityResponse;
module.exports.validityCheck = validityCheck;