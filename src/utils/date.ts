import moment, { Moment } from "moment";
moment.locale('ja')

const DEFAULT_DATE_FORMAT = '';
export const YYYY_MM_DD_FORMAT = 'YYYY-MM-DD';
export const YYYY_MM_DD_JA_FORMAT = 'YYYY年M月D日';
export const YYYY_MM_DD_SLASH_FORMAT = 'YYYY/MM/DD';
export const YYYY_MM_DD_SLASH_PERIOD = 'YYYY.MM.DD';

export function convertDateToString(date?:Date, format?:string){
    if(!date) {
        date = new Date()
    }
    if(!format) {
        format = YYYY_MM_DD_FORMAT
    }
    return moment(date).format(format);
}

/**
 * 今日を取得します
 */
export function getMomentDate(date?:string) {
    if(!date) return moment();
    return moment(date);
};
/**
 * 日付を指定したフォーマットに変換します
 * @param {*} date 
 * @param {*} format 
 */
export function formatDate(date?:string, format?:string) {
    if (!date) {
        return moment(moment()).format(DEFAULT_DATE_FORMAT);
    }
    if (!format) format = DEFAULT_DATE_FORMAT;
    return moment(date).format(format);
};

export function beforeDate(before:number, format:string) {
    var add = -1*before;
    return addDate(getMomentDate(), -1*before, format)
}

const addMoment = (date:Moment, add:number, slug:moment.unitOfTime.DurationConstructor, format:string) =>  {
    if(!add) return date;

    if (!date) date = moment();
    if (!slug) slug = 'd';
    if (!format) format = DEFAULT_DATE_FORMAT;
    return moment(date).add(add, slug).format(format);
};

/**
 * 年の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addYear(date:Moment, add:number, format:string) {
    return addMoment(date, add, 'y', format);
};

/**
 * 月の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addWeek(date:Moment, add:number, format:string) {
    return addMoment(date, add, 'w', format);
};

/**
 * 日の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addDate(date:Moment, add:number, format:string) {
    return addMoment(date, add, 'd', format);
};

/**
 * 時間の加算を実施
 * @param {*} date 
 * @param {*} add 
 * @param {*} format 
 */
export function addHour(date:Moment, add:number, format:string) {
    return addMoment(date, add, 'h', format);
};

/**
 * 曜日を取得します
 */
export function getMonth(date:Moment) {
    if(!date) {
        return moment().format('MMM')
    }
    return moment(date).format('MMM')
};

/**
 * 曜日を取得します
 */
export function getYoubi(date:Moment, format:string) {
    if(!date) {
        return  moment()
    }
    if(!format){
        format = 'dddd'
    }
    return moment(date).format(format)
};

/**
 * 指定日付間の差分を取得します
 * @param {*} to 
 * @param {*} from 
 * @param {*} type months/days/hours/
 */
export function getDiff(to:Moment, from:Moment, type:moment.unitOfTime.Diff = 'hour', useDecimal = false) {
    if(!to || !from){
        return 0
    }
    if(!type){
        type = 'hour'
    }
    return to.diff(from, type, useDecimal) 
};

/**
 * 第一引数の日付が第二引数の日付以前かどうか
 * @param {*} to 
 * @param {*} from 
 */
export function isBefore(to:string, from:string) {
    if(!to || !from){
        return false
    }
    if(!moment(to).isValid() || !moment(from).isValid()){
        return false
    }
    const dateTo = moment(to)
    const dateFrom = moment(from)
    let result = dateTo.isBefore(dateFrom)
    return result
};