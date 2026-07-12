import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import chatbot_icon from './chatbot_icon.png'
import chatbot_icon1 from './chatbot_icon1.png'
import logo from './logo.png'
import logointitle1 from './logointitle1.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import paperclip from './paperclip.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import Esewa_logo from './Esewa_logo.png'
import Khalti_logo from './Khalti_logo.png'
import cardiodoctor1 from './cardiodoctor1.png'
import cardiodoctor2 from './cardiodoctor2.png'
import dentaldoctor1 from './dentaldoctor1.png'
import dentaldoctor2 from './dentaldoctor2.png'
import dermdoctor1 from './dermdoctor1.png'
import dermdoctor2 from './dermdoctor2.png'
import endodoctor1 from './endodoctor1.png'
import endodoctor2 from './endodoctor2.png'
import entdoctor1 from './entdoctor1.png'
import entdoctor2 from './entdoctor2.png'
import gastrodoctor1 from './gastrodoctor1.png'
import gastrodoctor2 from './gastrodoctor2.png'
import gpdoctor1 from './gpdoctor1.png'
import gpdoctor2 from './gpdoctor2.png'
import gynodoctor1 from './gynodoctor1.png'
import gynodoctor2 from './gynodoctor2.png'
import nephrodoctor1 from './nephrodoctor1.png'
import nephrodoctor2 from './nephrodoctor2.png'
import neurodoctor1 from './neurodoctor1.png'
import neurodoctor2 from './neurodoctor2.png'
import opthdoctor1 from './opthdoctor1.png'
import opthdoctor2 from './opthdoctor2.png'
import pediadoctor1 from './pediadoctor1.png'
import pediadoctor2 from './pediadoctor2.png'
import pulmonodoctor1 from './pulmonodoctor1.png'
import pulmonodoctor2 from './pulmonodoctor2.png'
import cardiologist from './cardiologist.png'
import dental from './dental.png'
import dermatologist from './dermatologist.png'
import endocrinologist from './endocrinologist.png'
import ent from './ent.png'
import gastroenterologist from './gastroenterologist.png'
import general_physician from './general_physician.png'
import gynecologist from './gynecologist.png'
import nephrologist from './nephrologist.png'
import neurologist from './neurologist.png'
import opthalmologist from './opthalmologist.png'
import pediatrician from './pediatrician.png'
import pulmonologist from './pulmonologist.png'
export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    logointitle1,
    chats_icon,
    paperclip,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    Esewa_logo,
    Khalti_logo,
    chatbot_icon,
    chatbot_icon1
}

export const specialityData = [
    {
        speciality: 'Cardiologist',
        image: cardiologist
    },
    {
        speciality: 'Dentist',
        image: dental
    },
    {
        speciality: 'Dermatologist',
        image: dermatologist
    },
    {
        speciality: 'Endocrinologist',
        image: endocrinologist
    },
    {
        speciality: 'ENT Doctor',
        image: ent
    },
    {
        speciality: 'Gastroenterologist',
        image: gastroenterologist
    },
    {
        speciality: 'General Physician',
        image: general_physician
    },
    {
        speciality: 'Gynecologist',
        image: gynecologist
    },
    {
        speciality: 'Nephrologist',
        image: nephrologist
    },
    {
        speciality: 'Neurologist',
        image: neurologist
    },
    {
        speciality: 'Opthalmologist',
        image: opthalmologist
    },
    {
        speciality: 'Pediatrician',
        image: pediatrician
    },
    
    {
        speciality: 'Pulmonologist',
        image: pulmonologist
    },
]

export const doctors = [
    {
        _id: 'cardiodoctor1',
        name: 'Dr. Shyam Shah',
        image: cardiodoctor1,
        speciality: 'Cardiologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Shyam Shah is a cardiologist who cares for heart health. He focuses on preventing heart diseases, finding problems early, and giving the right treatment on time. Dr. Shah believes in guiding patients about healthy habits and proper care to keep their hearts strong. He always tries to provide safe and effective treatment for better long-term health.',
        fees: 500,
        address: {
            line1: 'Koteshwor,Kathmandu',
            
        }
    },
    {
        _id: 'dentaldoctor1',
        name: 'Dr. Neil Pradhan',
        image: dentaldoctor1,
        speciality: 'Dentist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Neil Pradhan is a dentist who provides complete dental care for patients of all ages. He focuses on preventing dental problems, finding issues early, and giving proper treatment to keep teeth and gums healthy. Dr. Pradhan believes in educating patients about good oral hygiene and ensuring comfortable and effective dental care.',
        fees: 500,
        address: {
            line1: 'Baneshwor,Kathmandu',
            
        }
    },
    {
        _id: 'dermdoctor1',
        name: 'Dr. Smriti Jha',
        image: dermdoctor1,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Smriti Jha is a dermatologist who treats skin, hair, and nail problems. She focuses on preventing skin conditions, early diagnosis, and providing safe and effective treatments. Dr. Jha helps patients understand proper skin care and works to improve their skin health and confidence.',
        fees: 600,
        address: {
            line1: 'Sanothimi,Bhaktapur',
            
        }
    },
    {
        _id: 'endodoctor1',
        name: 'Dr. Suman Poudel',
        image: endodoctor1,
        speciality: 'Endocrinologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Suman Poudel is an endocrinologist who treats hormone-related health problems. He focuses on early diagnosis, proper treatment, and long-term management of conditions such as diabetes and thyroid disorders. Dr. Poudel guides patients on healthy lifestyle habits to maintain balanced hormones and overall well-being.',
        fees: 600,
        address: {
            line1: 'Sallaghari,Bhaktapur',
            
        }
    },
    {
        _id: 'entdoctor1',
        name: 'Dr. Ram Jha',
        image: entdoctor1,
        speciality: 'ENT Doctor',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ram Jha is an ENT specialist who treats problems related to the ear, nose, and throat. He focuses on early diagnosis, proper treatment, and preventive care to help patients maintain good hearing, breathing, and throat health. Dr. Jha ensures comfortable and effective care for all age groups.',
        fees: 600,
        address: {
            line1: 'Chardobato,Bhaktapur',
            
        }
    },
    {
        _id: 'gastrodoctor1',
        name: 'Dr. Umid Kumar Sharma',
        image: gastrodoctor1,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Umid Kumat Sharma is a gastroenterologist who treats digestive system problems. He focuses on early diagnosis, proper treatment, and prevention of stomach, liver, and intestinal diseases. Dr. Sharma guides patients on healthy eating habits and provides effective care for long-term digestive health.',
        fees: 500,
        address: {
            line1: 'Balkumari,Kathmandu',
            
        }
    },
    {
        _id: 'gpdoctor1',
        name: 'Dr. Mahesh Keyal',
        image: gpdoctor1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Mahesh Keyal is a general physician who provides primary medical care for common health problems. He focuses on early diagnosis, preventive care, and proper treatment to help patients stay healthy. Dr. Keyal guides patients on healthy lifestyle habits and ensures timely and effective medical care.',
        fees: 500,
        address: {
            line1: 'Sanothimi,Bhaktapur',
            
        }
    },
    {
        _id: 'gynodoctor1',
        name: 'Dr. Priyanka Shrestha',
        image: gynodoctor1,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Priyanka Shrestha is a gynecologist who provides medical care for women’s health. She focuses on preventive care, early diagnosis, and proper treatment of gynecological and reproductive health issues. Dr. Shrestha guides women on maintaining good health and offers safe, comfortable, and supportive care.',
        fees: 500,
        address: {
            line1: 'Gothatar,Bhaktapur',
            
        }
    },
    {
        _id: 'nephrodoctor1',
        name: 'Dr. Nabin Bahadur Ghimire',
        image: nephrodoctor1,
        speciality: 'Nephrologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Nabin Bahadur Ghimire is a nephrologist who treats kidney-related health problems. He focuses on early diagnosis, proper treatment, and long-term care for kidney diseases. Dr. Ghimire guides patients on healthy habits and works to maintain good kidney health and overall well-being.',
        fees: 600,
        address: {
            line1: 'Tinkune,Kathmandu',
            
        }
    },
    {
        _id: 'neurodoctor1',
        name: 'Dr. Pankaj Karki',
        image: neurodoctor1,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Pankaj Karki is a neurologist who treats problems related to the brain and nervous system. He focuses on early diagnosis, proper treatment, and long-term care of neurological conditions. Dr. Karki helps patients understand their condition and provides effective care to improve their quality of life.',
        fees: 600,
        address: {
            line1: 'Tinkune,Kathmandu',
            
        }
    },
    {
        _id: 'opthdoctor1',
        name: 'Dr. Shyam Shakya',
        image: opthdoctor1,
        speciality: 'Opthalmologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Shyam Shakya is an ophthalmologist who treats eye and vision problems. He focuses on early diagnosis, proper treatment, and preventive eye care to protect and improve vision. Dr. Shakya guides patients on eye health and provides safe and effective care for long-term eye wellness.',
        fees: 600,
        address: {
            line1: 'Maitidevi,Kathmandu',
            
        }
    },
    {
        _id: 'pediadoctor1',
        name: 'Dr. Sushil Bhandari',
        image: pediadoctor1,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Sushil Bhandari is a pediatrician who provides medical care for infants, children, and adolescents. He focuses on preventive care, early diagnosis, and proper treatment to support healthy growth and development. Dr. Bhandari works closely with parents to ensure safe and effective care for children.',
        fees: 700,
        address: {
            line1: 'Maitighar,Kathmandu',
            
        }
    },
    {
        _id: 'pulmonodoctor1',
        name: 'Dr. Ekta Gurung',
        image: pulmonodoctor1,
        speciality: 'Pulmonologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ekta Gurung is a pulmonologist who treats lung and breathing-related problems. She focuses on early diagnosis, proper treatment, and long-term care of respiratory conditions. Dr. Gurung guides patients on healthy breathing habits and provides effective care to improve lung health.',
        fees: 700,
        address: {
            line1: 'New Road,Kathmandu',
            
        }
    },
    {
        _id: 'cardiodoctor2',
        name: 'Dr. Hari Rai',
        image: cardiodoctor2,
        speciality: 'Cardiologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Hari Rai is a cardiologist who cares for heart health. He focuses on preventing heart diseases, finding problems early, and giving the right treatment on time. Dr. Rai believes in guiding patients about healthy habits and proper care to keep their hearts strong. He always tries to provide safe and effective treatment for better long-term health.',
        fees: 500,
        address: {
            line1: 'Sundhara,Kathmandu',
            
        }
    },
    {
        _id: 'dentaldoctor2',
        name: 'Dr. Sama Pandey',
        image: dentaldoctor2,
        speciality: 'Dentist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Sama Pandey is a dentist who provides complete dental care for patients of all ages. She focuses on preventing dental problems, finding issues early, and giving proper treatment to keep teeth and gums healthy. Dr. Pandey believes in educating patients about good oral hygiene and ensuring comfortable and effective dental care.',
        fees: 500,
        address: {
            line1: 'Koteshwor,Kathmandu',
            
        }
    },
    {
        _id: 'dermdoctor2',
        name: 'Dr. Rajan Shrestha',
        image: dermdoctor2,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Rajan Shrestha is a dermatologist who treats skin, hair, and nail problems. He focuses on preventing skin conditions, early diagnosis, and providing safe and effective treatments. Dr. Shrestha helps patients understand proper skin care and works to improve their skin health and confidence.',
        fees: 600,
        address: {
            line1: 'Sanothimi,Bhaktapur',
            
        }
    },
    {
        _id: 'endodoctor2',
        name: 'Dr. Deepak Baral',
        image: endodoctor2,
        speciality: 'Endocrinologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Deepak Baral is an endocrinologist who treats hormone-related health problems. He focuses on early diagnosis, proper treatment, and long-term management of conditions such as diabetes and thyroid disorders. Dr. Poudel guides patients on healthy lifestyle habits to maintain balanced hormones and overall well-being.',
        fees: 600,
        address: {
            line1: 'Sallaghari,Bhaktapur',
            
        }
    },
    {
        _id: 'entdoctor2',
        name: 'Dr. Sita Shah',
        image: entdoctor2,
        speciality: 'ENT Doctor',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Sita Shah is an ENT specialist who treats problems related to the ear, nose, and throat. She focuses on early diagnosis, proper treatment, and preventive care to help patients maintain good hearing, breathing, and throat health. Dr. Shah ensures comfortable and effective care for all age groups.',
        fees: 600,
        address: {
            line1: 'Chardobato,Bhaktapur',
            
        }
    },
    {
        _id: 'gastrodoctor2',
        name: 'Dr. Rabina Shrestha',
        image: gastrodoctor2,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Rabina Shrestha is a gastroenterologist who treats digestive system problems. She focuses on early diagnosis, proper treatment, and prevention of stomach, liver, and intestinal diseases. Dr. Shrestha guides patients on healthy eating habits and provides effective care for long-term digestive health.',
        fees: 500,
        address: {
            line1: 'Balkumari,Kathmandu',
            
        }
    },
    {
        _id: 'gpdoctor2',
        name: 'Dr. Kabita Dahal',
        image: gpdoctor2,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Kabita Dahal  is a general physician who provides primary medical care for common health problems. She focuses on early diagnosis, preventive care, and proper treatment to help patients stay healthy. Dr. Dahal guides patients on healthy lifestyle habits and ensures timely and effective medical care.',
        fees: 500,
        address: {
            line1: 'Sanothimi,Bhaktapur',
            
        }
    },
    {
        _id: 'gynodoctor2',
        name: 'Dr. Reena Tripathi',
        image: gynodoctor2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Reena Tripathi is a gynecologist who provides medical care for women’s health. She focuses on preventive care, early diagnosis, and proper treatment of gynecological and reproductive health issues. Dr. Tripathi guides women on maintaining good health and offers safe, comfortable, and supportive care.',
        fees: 500,
        address: {
            line1: 'Gothatar,Bhaktapur',
            
        }
    },
    {
        _id: 'nephrodoctor2',
        name: 'Dr. Madhav Basnet',
        image: nephrodoctor2,
        speciality: 'Nephrologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Madhav Basnet is a nephrologist who treats kidney-related health problems. He focuses on early diagnosis, proper treatment, and long-term care for kidney diseases. Dr. Basnet guides patients on healthy habits and works to maintain good kidney health and overall well-being.',
        fees: 600,
        address: {
            line1: 'Tinkune,Kathmandu',
            
        }
    },
    {
        _id: 'neurodoctor2',
        name: 'Dr. Prasanna Jalan',
        image: neurodoctor2,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Prasanna Jalan is a neurologist who treats problems related to the brain and nervous system. He focuses on early diagnosis, proper treatment, and long-term care of neurological conditions. Dr. Jalan helps patients understand their condition and provides effective care to improve their quality of life.',
        fees: 600,
        address: {
            line1: 'Tinkune,Kathmandu',
            
        }
    },
    {
        _id: 'opthdoctor2',
        name: 'Dr. Kiran Ruit',
        image: opthdoctor2,
        speciality: 'Opthalmologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kiran Ruit is an ophthalmologist who treats eye and vision problems. He focuses on early diagnosis, proper treatment, and preventive eye care to protect and improve vision. Dr. Ruit guides patients on eye health and provides safe and effective care for long-term eye wellness.',
        fees: 600,
        address: {
            line1: 'Maitidevi,Kathmandu',
            
        }
    },
    {
        _id: 'pediadoctor2',
        name: 'Dr. Vidhata Bhandari',
        image: pediadoctor2,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Vidhata Bhandari is a pediatrician who provides medical care for infants, children, and adolescents. She focuses on preventive care, early diagnosis, and proper treatment to support healthy growth and development. Dr. Bhandari works closely with parents to ensure safe and effective care for children.',
        fees: 700,
        address: {
            line1: 'Maitighar,Kathmandu',
            
        }
    },
    {
        _id: 'pulmonodoctor2',
        name: 'Dr. Naresh Malla Rana',
        image: pulmonodoctor2,
        speciality: 'Pulmonologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Naresh Malla Rana is a pulmonologist who treats lung and breathing-related problems. She focuses on early diagnosis, proper treatment, and long-term care of respiratory conditions. Dr. Rana guides patients on healthy breathing habits and provides effective care to improve lung health.',
        fees: 700,
        address: {
            line1: 'New Road,Kathmandu',
        }
    },
    
  
]