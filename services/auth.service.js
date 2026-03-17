import { client } from '../index.js'
import config from '../config/index.js'

DATABASE_URL = config["database"];


const Register = async (firstName, email, password) => { 
    const checkUserStatus = await client.db(DATABASE_URL).collection('users').findOne({
        email: email,
        
    })
    if (checkUserStatus) {
        return 'email already exists'
    }



    return await client.db(DATABASE_URL).collection('users').insertOne({
        firstName,
        email,
        password
    })

}
const Login = () => { }




const authController = {
    Register,Login,
}