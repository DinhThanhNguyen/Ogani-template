//Hàm validator
function Validator(options) {

    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement
        }
    }


    //Hàm thực hiện validate
    let selectorRules = {}
    function validate(inputElement, rule) {
        let errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector)
        let errorMessage;

        //Lấy ra các rules của selector
        let inputRules = selectorRules[rule.selector]

        for (let i = 0; i < inputRules.length; i++) {
            errorMessage = inputRules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroup).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroup).classList.remove('invalid')
        }

        return !errorMessage
    }

    //Lấy Element của form cần Validate
    let formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function (rule) {
            //Lưu lại các rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElement = formElement.querySelector(rule.selector)
            let errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector)
            //Xử lí trường hợp Blur ra khỏi input
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
            }

            //Xử lí mỗi khi người dùng nhập input thì xoá lỗi
            inputElement.oninput = function () {
                errorElement.innerText = ''
                getParent(inputElement, options.formGroup).classList.remove('invalid')
            }
        })

        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;
            options.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            })

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]:not([disable])')

                    let formValues = Array.from(enableInputs).reduce(function (value, input) {
                        value[input.name] = input.value
                        return value;
                    }, {})
                    options.onSubmit(formValues)
                } else {
                    formElement.onsubmit()
                }
            }
        }
    }
}
// Định nghĩa các Rules
// Nguyên tắc: 
// 1. Khi hợp lệ trả lại undefined
// 2. Khi có lỗi trả lại Message lỗi
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isPhoneNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return regex.test(value) ? undefined : message || 'Số điện thoại không hợp lệ'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng Email'
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
        }
    }
}

Validator.maxLength = function (selector, max) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= max ? undefined : `Vui lòng nhập ít hơn ${max} kí tự`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập lại không trùng khớp'
        }
    }
}