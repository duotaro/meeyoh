import ENV from "./env"
import { MEE_BIRTHDAY, YOH_BIRTHDAY, getAge, getLatestBirthday, getLifeDays, getNextAge, getNextBirthday, getToBirthday } from "./age"
import { MEE_NAME, YOH_NAME } from "./const"
import { YYYY_MM_DD_JA_FORMAT, formatDate } from "./date"

export class Profile {
    id: string = ''
    name:string = ''
    name_english:string =  ''
    short_name_english:string = ''
    iconImg:string = ''
    overlayColor:string = 'bg-gradient-success'
    backgroundImg:string =  'url('+process.env.BASE_URL + 'img/cm2.png)'
    dateOfBairth:string = ENV.MEE_BIRTHDAY || ''
    text:string = '何か説明文的な？必要ないかな？'
    profession:string =  '保育園児'
    role:string =  'お姉ちゃん'
    birthday:Date = new Date()
    height?:Object[] = []
    age?:number | undefined
    nextAge?:number | undefined
    lifeDays?:number | undefined
    latestBirthday?:string | undefined
    nextBirthday?:string | undefined
    daysNextBirthday?:number | undefined
}

export const MEE_PROFILE:Profile = {
    id: MEE_NAME,
    name: ENV.MEE_NAME || '',
    name_english: ENV.MEE_NAME_ENG || '',
    short_name_english: ENV.MEE_NAME_ENG_SHORT || '',
    iconImg: ENV.CLOUD_FLARE_PUBLIC_URL + 'm_icon.png',
    overlayColor: 'bg-warning bg-gradient',
    backgroundImg: '',
    dateOfBairth: MEE_BIRTHDAY || '',
    text: '何か説明文的な？必要ないかな？',
    profession: '保育園児',
    role: 'お姉ちゃん',
    birthday: MEE_BIRTHDAY ? new Date(MEE_BIRTHDAY) : new Date(),
    height: [{}]
}

export const YOH_PROFILE:Profile = {
    id: YOH_NAME,
    name: ENV.YOH_NAME || '',
    name_english: ENV.YOH_NAME_ENG || '',
    short_name_english: ENV.YOH_NAME_ENG_SHORT || '',
    iconImg: ENV.CLOUD_FLARE_PUBLIC_URL + 'y_icon.png',
    overlayColor: 'bg-success bg-gradient',
    backgroundImg: '',
    dateOfBairth: YOH_BIRTHDAY || '',
    text: '何か説明文的な？必要ないかな？',
    profession: '保育園児',
    role: '弟',
    birthday: YOH_BIRTHDAY ? new Date(YOH_BIRTHDAY) : new Date(),
    height: [{}]
}

export const getProfile = (name:string):Profile => {
    let profile:Profile
    if(name == MEE_NAME){
        profile =  MEE_PROFILE
    } else {
        profile = YOH_PROFILE
    }
    // 年齢などを計算
    profile.age = getAge(name)
    profile.nextAge = getNextAge(name)
    profile.lifeDays = getLifeDays(name)
    profile.latestBirthday = formatDate(getLatestBirthday(name)?.toString(), YYYY_MM_DD_JA_FORMAT)
    profile.nextBirthday = formatDate(getNextBirthday(name)?.toString(), YYYY_MM_DD_JA_FORMAT)
    profile.daysNextBirthday = getToBirthday(name)
    return profile
}
