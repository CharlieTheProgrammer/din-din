import { extend } from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);
extend("max", max);
