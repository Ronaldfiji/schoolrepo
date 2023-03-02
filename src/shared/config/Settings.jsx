
let Settings = () =>{

    let ApiUrlStaging = () =>{
            return 'https://localhost/api';
    }
    return [ApiUrlStaging];
    
    }
    
    export const ApiUrlProd =  "https://fjecomapi.azurewebsites.net:443/api"
    
    export default Settings;
    
    
    
    /*
    How to access anonymous function in compoenent or other service class.
    
    1. Add import 
    import Configuration, {ApiUrlProd } from "../../../components/Global/Configuration"
    2. Destructure 
    let [ApiUrlStaging] = Configuration();
    3. Call the method woth parenthesis ().
      static baseUrl = `${ApiUrlStaging()}/customer`;
    
    4. You can call export variable/ method directly.
      console.log('Prod api url is :' + ApiUrlProd);
    
    
    */