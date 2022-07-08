import { request } from "../../../services/api";

class ApiService{

    static getLanguage=(params,name)=>{

        return request.get(`language/message/index?name=${name}`,{
            params: {
                "per-page": 20,
                 include: "messages",
                ...params,
            },
        })

    }
    static createMessage=(withTranslation_message,message)=>{
        console.log(withTranslation_message,'api')
        return request.post("language/message/create",{
            translate:withTranslation_message,
                message,
        })
    }
    static updateMessage=(withTranslation_message,message,id)=>{
        return request.post("language/message/update",{
            translate:withTranslation_message,
            message,
            id,
        })
    }
    static getOneMessage=(message_id)=>{
        return request.get(`language/message/view?message_id=${message_id}`,{
        })
    }
}
export default ApiService;