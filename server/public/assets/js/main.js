const NAME_BTN_RADIO = 'operation';
const ID_NOTIFICATION = 'notification';
const ID_INPUT_FIRST_NUM = '1st-num';
const ID_INPUT_SECOND_NUM = '2nd-num';
const ID_INPUT_RESULT = 'result';


const CODE_BLANK  = "";
const CODE_OK  = "OK";
const CODE_100 = "Không thể chia cho không";
const CODE_101 = "Vui lòng nhập số thứ nhất";
const CODE_102 = "Vui lòng nhập số thứ hai";
const CODE_103 = "Vui lòng chọn phép toán";
const CODE_104 = "Số thứ nhất chứa ký tự không hợp lệ";
const CODE_105 = "Số thứ hai chứa ký tự không hợp lệ";

function calculate() {
    let firstValue = document.getElementById(ID_INPUT_FIRST_NUM).value;
    let secondValue = document.getElementById(ID_INPUT_SECOND_NUM).value;
    let checked_operation = "";

    let validateCode;

    let a_parsed = Number.parseFloat(firstValue);
    let b_parsed = Number.parseFloat(secondValue);

    const operation_values = document.getElementsByName(NAME_BTN_RADIO);
    for (element of operation_values) {
        if (element.checked) {
            checked_operation = element.value;
        }
    }
    validateCode = validateInput(firstValue, secondValue, checked_operation);
    if (validateCode === CODE_OK) {
        switch (checked_operation) {
            case "plus":
                {
                    printResult(a_parsed + b_parsed);
                    break;
                }
            case "minus":
                {
                    printResult(a_parsed - b_parsed);
                    break;
                }
            case "multiply":
                {
                    printResult(a_parsed * b_parsed);
                    break;
                }
            case "divide":
                {
                    printResult(a_parsed / b_parsed);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    printNotification(validateCode);


}

function validateInput(firstValue, secondValue, checked_operation) {
    let a;
    let b;
    let operation;
    if(firstValue === "" || firstValue === undefined){
        return CODE_101;
    }
    a = Number.parseFloat(firstValue);
    if(Number.isNaN(a)){
        return CODE_104;
    }

    if(secondValue === "" || secondValue === undefined){
        return CODE_102;
    }
    b = Number.parseFloat(secondValue);
    if(Number.isNaN(b)){
        return CODE_105;
    }

    if(checked_operation === "" || checked_operation === undefined){
        return CODE_103;
    }
    else{
        if(checked_operation === "divide"){
            if(b === 0) return CODE_100;
        }
    }


    return CODE_OK;
    

    

}

function printResult(result){
    document.getElementById(ID_INPUT_RESULT).value = result;
}

function printNotification(code){
    document.getElementById(ID_NOTIFICATION).innerText=code;
}

function loseFocus(obj){
    let value = document.getElementById(obj.id).value;
    if(value === "" || value === undefined){
        if(obj.id === ID_INPUT_FIRST_NUM)
            printNotification(CODE_101) ;
        else
            printNotification(CODE_102) ;
        return;
    }
    let a = Number.parseFloat(value);
    if(Number.isNaN(a)){
        if(obj.id === ID_INPUT_FIRST_NUM)
            printNotification(CODE_104) ;
        else
            printNotification(CODE_105) ;
        return;
    }

    printNotification(CODE_BLANK);
}