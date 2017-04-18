import { Validator } from 'vee-validate';

Validator.extend('mobile', {
    messages: {
      zh_CN:field => '手机号码输入不正确',
    },
    validate: value => {
      return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});

export default Validator;