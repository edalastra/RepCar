import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import api from '../../api';

const DatepickerComponent = ({ reference, name, label }) =>  {

    useEffect(() => {
        (async () => {
          const { data } = await api.get('/services/date/reserved');
    
          const elems = document.querySelectorAll('.datepicker');
          const instances = M.Datepicker.init(elems, {
            disableWeekends: true,
            disableDayFn:
              date => {
                const disableListDate = data.map((res, i) => {
                  let d = new Date(res.date);
                  d.setDate(d.getDate() +1 );
                  return d.toDateString()
                });
                return disableListDate.includes(date.toDateString()) 
              },
            autoClose: true,
            minDate: new Date(),
            format: 'yyyy-mm-dd',
            i18n: {
              cancel: 'Cancelar',
              months:	[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
              ],
              monthsShort: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
              ],
              weekdays: [
                    'Domingo',
                    'Segunda',
                    'Terça',
                    'Quarto',
                    'Quinta',
                    'Sexta',
                    'Sabado'
                ],
            weekdaysShort: [
                'Dom',
                'Seg',
                'Ter',
                'Qua',
                'Qui',
                'Sex',
                'Sab'
            ],
            weekdaysAbbrev:	['D','S','T','Q','Q','S','S']
              
            }
          });
    
      })()
    
    }, [])

  return (<>
  <label htmlFor="date">{label}</label>
    <input ref={reference}
        name={name}
        type="text" 
        class="datepicker"
        id="date"
  />
 </> );
}

export default DatepickerComponent;