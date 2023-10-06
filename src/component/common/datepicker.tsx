'use client'
import { YYYY_MM_DD_FORMAT, YYYY_MM_DD_JA_FORMAT } from '@/utils/date'
import 'flatpickr/dist/flatpickr.min.css'
import { Japanese } from 'flatpickr/dist/l10n/ja.js'

import Flatpickr from 'react-flatpickr'

export default function DatePicker({date, callback}:{
    date:Date
    callback:Function
}){
    const today = new Date() 
    const option = {
        locale: Japanese,
        //minDate: today,
        defaultDate: date,
        dateFormat:  'Y年m月d日(D)',
        //mode: "single"
        selected:date
    }
    return (
        <Flatpickr
        options={option}
        selected={date}
        minDate={today}
        onChange={(date:Date[]) => {
            callback(date[0])
        }}
        />
    )
}