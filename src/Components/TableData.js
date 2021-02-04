import React, { Component } from "react";
import axios from "axios" ;
import { Table } from "react-bootstrap";
import {Link }  from "react-router-dom" ;
import ReactPaginate from "react-paginate"


var sop =4 ; 
class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      finalData: [],
      reacorData: [],
      count: 0,
      Total: "",
      pageCount: 1,
      pageRange: 2,
    };
    this.callApi(this.state.count);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
      this.callApi(this.state.count);
    }, 10000);
  }

  callApi(count) {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`
      )
      .then((res) => {
        console.log(res, "apiCall");
        this.state.reacorData = res.data.hits;
        this.state.tableData.push(...res.data.hits);
        console.log(this.state.finalData, "finalData");
        if (this.state.reacorData.length > 0) {
          this.setState({
            pageCount: this.state.tableData.length / 20,
          });
        } else {
          this.setState((prevState) => ({
            tableData: prevState.tableData,
          }));
        }
        if (this.state.pageCount == 1) {
          this.handlePageClick(this.state.pageCount);
        }
        console.log(this.state.pageCount, "tableData");
      })
      .catch(err => {
          console.log(err) ;
      });
  }

  handlePageClick = e => {
      console.log(e.selected + 1); 
      var d =e.selected + 1 ;
      if (d > 1){
          var s = (d + e.selected +1 ) * 10 -1 ;
          var f = s-19 ;
          console.log("sliced" , f , s ) ;

          this.setState({
            finalData:this.state.tableData.slice(f,s)  
          });
          console.log(this.state.finalData , "finalData") ;
      }else{
          console.log("sliced " , this.state.tableData); 
          this.setState({
              finalData:this.state.tableData.slice(0,19)
          });
      }
  } ;
handlePass = (e , data ) => {
    e.preventDefault () ;
    console.log(data , "data") ;
    this.props.history.push  ("./jsonData" , data)
} ;
 

  render() {
      const {tableData ,finalData ,pageCount } = this.state ;
    return (
      <React.Fragment>
        <h1> Table</h1>

        <Table stripped bordered resource>
          <thread>
            <tr>
              <th>one </th>
              <th>two</th>
              <th>three</th>
              <th>four</th>
            </tr>

          </thread>
          <tbody>
       {finalData.length > 0 ? (
     finalData.map(x => {
    return(
    <tr key={x.id} onClick = {e => this.handlePass (e, x )}>
     <td>{x.title}</td>
     <td>
         <a href ="" >{x.url} </a>
     </td>

     <td>{x.created_at}</td>
     <td>{x.author}</td>

     </tr>
    );
})
 ) :  (
   <></>
 
)}
          </tbody>
        </Table>

        <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel = {<span className ="gap " > ...</span>}
        pageCount={pageCount}
        onPageChange={this.handlePageClick}
        pageRangeDisplayed={20} 
        forcePage ={this.state.count +1 }
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__page"}
        nextLinkClassName={"next__page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
      </React.Fragment>
    );
  }
}

export default TableData;
