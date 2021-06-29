import React, { Component } from 'react';
import {Link,withRouter} from'react-router-dom';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            load:false,
        }
        this.data = null
    }
    componentDidMount(){
        document.title = "Home";
        if(this.props.data ==null){
            location.replace("/login")
        }
        else{
        this.fetchData();
        }
    }
    fetchData=()=>{
        fetch("/api/v1/email/get-mails/"+this.props.data._id).then((response) => response.json())
            .then((data) => {
                if (data.length>0) {
                    this.data = data
                }
                this.setState({load:true})
                console.log(data);
            });
    }
    cancelSchedule=(e,id)=>{
        e.preventDefault();
        fetch("/api/v1/email/cancel-schedule/"+id).then((response) => response.json()).then((data) => {
                location.reload()
            });
    }
        render() {
            return (
            <main id="main">
                <section class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                    <h2>Home</h2>
                    </div>

                </div>
                </section>
                <section class="inner-page">
                <div class="container">
                <h3>Future Emails</h3>
                    {this.state.load &&
                    <>
                    {
                        this.data == null ?
                        <h2>No Future Emails Scheduled</h2>:
                        <div className="position-relative d-flex flex-wrap flex-row justify-content-around">
                        {this.data.map((data,idx)=>{
                            return(
                                <div key={idx} className="card my-2 mx-2">
                                    <div class="card-body">
                                        <p>
                                            TO : {data.sendTo}<br />
                                            CC : {data.CC}<br />
                                            Subject : {data.Subject}<br />
                                            Body : {data.Body}<br />
                                            Schedule : <br />
                                            <span className="float-right">{data.ScheduleType}</span><br />
                                            <span className="float-right">
                                                {data.ScheduleValue.month!= undefined && data.ScheduleValue.month + ", "}{data.ScheduleValue.date!= undefined && data.ScheduleValue.date + ", "}{data.ScheduleValue.day!= undefined && data.ScheduleValue.day + ", "}{data.ScheduleValue.hour!= undefined && data.ScheduleValue.hour + ", "}{data.ScheduleValue.minute!= undefined && data.ScheduleValue.minute + ", "}{data.ScheduleValue.val!= undefined && <> {data.ScheduleValue.val.length==3 ? "20, " : "30, "}</>}{data.ScheduleValue.type!= undefined && data.ScheduleValue.type + ", "}
                                      </span><br />
                                        </p>
                                        <button className="btn btn-danger" onClick={(e)=>{this.cancelSchedule(e,data._id)}}>Cancel Schedule</button>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    }
                    </>
                    }
                </div>
                </section>
            </main>
        )}
}
export default withRouter(Home)