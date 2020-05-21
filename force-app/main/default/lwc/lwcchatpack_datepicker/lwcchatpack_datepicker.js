import { LightningElement, track, api } from 'lwc';

export default class Lwcchatpack_datepicker extends LightningElement 
{
    @api inputParams;
    @track month;
    @track year;
    @track date;
    @api inputLabel = 'Select Date';
    jsCalInit = false;
    @track dateValue;
    @track isEnabled = true;

    connectedCallback()
    {
        this.displayed_date = new Date();
        this.selected_date  = this.displayed_date;
        this.date = this.selected_date.toLocaleDateString("en-US");
    }
    
    renderedCallback() 
    {
        //Prevent inifinate loop
        if (this.jsCalInit) {
            return;
        }

        //If first time loading...init
        this.jsCalInit = true;
        this.setDateTo(new Date());
    }

    get body_node() {
        return this.template.querySelector('.calendar__body');
    }

    get year_node() {
        return this.template.querySelector('.calendar-year');
    }

    get month_node() {
        return this.template.querySelector('.calendar-month');
    }

    //redraws the body according to the received date
    setDateTo(date) 
    {
        let 
            current_month = this.isThisMonthCurrent(date), //if it is current month, current day will be highlighted
            new_body      = this.createCalendarBody(date, current_month)

        this.year_node.innerHTML  = date.getFullYear()
        this.month_node.innerHTML = this.getMonthName(date)
        this.body_node.innerHTML  = ''
        this.body_node.appendChild(new_body)
    }

        createDaysArray(date) {
            let 
                prev_month_last_day = new Date( //number of the last day of the previous month
                    date.getFullYear(),
                    date.getMonth(),
                    0
                ).getDate(),
    
                first_week_day = new Date( //number of the first day of the current month f.e. monday->1, wednesday->3
                    date.getFullYear(),
                    date.getMonth(),
                    1
                ).getDay(),
    
                current_month_last_day = new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                ).getDate(),
    
                days_array = new Array(42),
    
                i = 0 // iterator for all three parts of array
    
            if (first_week_day == 0) first_week_day = 7 //if it was sunday
    
            let first_array_element = prev_month_last_day - first_week_day + 2
    
            //adds last days of previous month 
            for (i = 0; i < first_week_day - 1; ++i){
                days_array[i] = {
                    number: first_array_element + i,
                    from: 'prev month'
                }
            }
    
            //adds days of current month
            for (let k = 1; k <= current_month_last_day; ++k) {
                days_array[i] = {
                    number: k,
                    from: 'currnet month',
                    weekend: i % 7 > 4
                }
                i++
            }
    
            //adds days of next month
            for (let k = 0; i < days_array.length; ++k) {
                days_array[i] = {
                    number: k + 1,
                    from: 'next month'
                }
                i++
            }
    
            return days_array
        }
        
        //returns a  fulfilled and styled table DOM element
        createCalendarBody(date, current_month = false ) {
            let 
                days_array = this.createDaysArray(date),   
                table = document.createDocumentFragment(),
                i = 0
    
            for (let j = 0; j < 6; ++j) {
                let tr = document.createElement('tr')
    
                for (let k = 0; k < 7; ++k) {
                    let td = document.createElement('td')
                    td.innerHTML = days_array[i].number
                    tr.appendChild(td)
    
                    //add the styles that depend on what month the day belongs to
                    td.classList.add('calendar-cell')
                    td.classList.add('slds-text-align_center')
                    if (days_array[i].from !== 'currnet month') {
                        td.classList.add('slds-text-color_inverse-weak')
                    } else {
                        if (current_month && this.selected_date.getDate() == days_array[i].number) {
                            td.classList.add('selected_date');
                            td.classList.add('calendar-cell-selected');
                            td.classList.add('slds-theme_shade')
                        }
                        if (days_array[i].weekend)
                        if (current_month && this.current_day == days_array[i].number) {                        
                        }
                    }
                    ++i
                }
                table.appendChild(tr)
            }
    
            return table
        }
        //returns month name from date 
        getMonthName(date) {
            const month_names = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
    
            return month_names[date.getMonth()]
        }
    
        //if the received date corresponds to the current month and year returns true
        isThisMonthCurrent(date) {
            let current = new Date()
            if (
                current.getFullYear() == date.getFullYear() &&
                current.getMonth() == date.getMonth()
            )
                return true
            else 
                return false
        }
            
        //redraws the calendar a month in backward
        moveLeft() {
            this.displayed_date = new Date( //set the day to prev month
                this.displayed_date.getFullYear(),
                this.displayed_date.getMonth() - 1,
                1
            )
            this.setDateTo(this.displayed_date)
        }
    
        //redraws the calendar a month in forward
        moveRight() {
            this.displayed_date = new Date( //set the day to next month
                this.displayed_date.getFullYear(),
                this.displayed_date.getMonth() + 1,
                1
            )
            this.setDateTo(this.displayed_date)
        }
        focusDate(){
            const calendar_body = this.template.querySelector('.slds-media__body');
            //calendar_body.classList.toggle("slds-hide");
        }
        //handles user clicks on cells
        selectHandler(e) {
            if (e.target.classList.contains('calendar-cell-gray')) return //only days of current month can be selected
            if (!e.target.classList.contains('calendar-cell')) return //if it was   n't a click on a cell
            if (!this.isEnabled) return;
            
            let prev_selected = this.template.querySelector('.selected_date')
            if (prev_selected) {
                prev_selected.classList.remove('calendar-cell-selected')
                prev_selected.classList.remove('selected_date')
                prev_selected.classList.remove('slds-theme_shade')
            }
    
            this.selected_date = new Date(
                this.displayed_date.getFullYear(),
                this.displayed_date.getMonth(),
                e.target.innerHTML
            )

            e.target.classList.add('selected_date');
            e.target.classList.add('calendar-cell-selected');
            e.target.classList.add('slds-theme_shade')
            this.date = this.selected_date.toLocaleDateString("en-US");
            this.dateValue = this.date;
            this.dispatchEvent(new CustomEvent('postmessage',{
                detail: this.dateValue
            }));
            console.log('dispatched event with value:' + this.dateValue);
            const calendar_body = this.template.querySelector('.slds-media__body');
            calendar_body.style.opacity = '40%';
            this.isEnabled = false;
            //this.focusDate();
        }
}