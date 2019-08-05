import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, getCount, setStatusCurPage, resetRedirect } from '../../redux/action-creators';

class Pagination extends Component {
  constructor(props) {
    super(props);
    const pageSize = this.props.pageSize;
    const count = this.props.count;
    const numberList = [];
    const totalPages = Math.ceil(count / pageSize);
    let startPage = 1, endPage = totalPages;
    console.log('setcurpage count is', count);
    for (let i = startPage; i <= endPage; i++) {
      numberList.push(i);
      console.log('already pushed', numberList);
    }
    this.state = {
      pageNums:  numberList
    };
  }

  // componentDidMount() {
  //   this.props.getCount();
  //   //this.setCurPage(1);
  //   //this.props.resetRedirect();
  // }

  //一会加上
  componentDidUpdate(prevProps) {
    if (this.props.count !== prevProps.count) {
      this.setCurPage(this.props.curPage);
      console.log('componentDidUpdate prevpros count', prevProps.count);
    }
    //console.log('componentDidUpdate count', this.props.count);

  }

  setCurPage = curPage => {
    this.props.getCount();
    this.props.fetchPage(curPage, 5);
    const pageSize = this.props.pageSize;
    const count = this.props.count;
    const pageNums = this.state.pageNums;

    const totalPages = Math.ceil(count / pageSize);
    let startPage = 1, endPage = totalPages;
    // console.log('setcurpage count is', count);
    for (let i = startPage; i <= endPage; i++) {
      pageNums.push(i);
      // console.log('set curpage already pushed', pageNums);
    }
    this.setState({ pageNums });
  };



  render() {
    // const pageProp = this.props.page;
    // const pageNumber = this.state.pageNumber;
    // const { count } = pageProp.count;
    // const { pageSize } = pageProp.pageSize;
    // const totalPages = Math.ceil(count / pageSize);
    //const pageNumber = this.props.pageNumber;
    const pageNums = this.state.pageNums;
    const count = this.props.count;
    const pageSize = this.props.pageSize;
    const totalPages = Math.ceil(count / pageSize);
    // console.log('totalpage is ', totalPages);
    // console.log('~Testing count is~~ ', count);
    // console.log('~Testing pageNums is~~ ', pageNums);
    // console.log('~Testing pageSize is~~ ', pageSize);
    return (
      // <ul className="pagination">
      //   <li className="page-item">
      //     {this.props.curPage === 1 ? '' : <a className="page-link" onClick={() => this.setCurPage(this.props.curPage - 1)} >Previous</a>}
      //   </li>
        // {pageNumber.map(page => {
        //   return (
        //     <li key={page} className="page-item">
        //       <a onClick={() => this.setCurPage(page)} className="page-link">{page}</a>
        //     </li>
        //   );
        // })}
      //   <li className="page-item">
      //     {this.props.curPage === totalPages ? '' : <a onClick={() => this.setCurPage(this.props.curPage + 1)} className="page-link" >Next</a>}
      //   </li>
      // </ul>
      <div>
        <div>
          {this.props.curPage === 1 ? '' : <button className="page-link" onClick={() => this.setCurPage(this.props.curPage - 1)} >Previous</button>}
        </div>
        <div>
          {pageNums.map(page => {
            return (
              <div key={page} className="page-item">
                <button onClick={() => this.setCurPage(page)} className="page-link">{page}</button>
              </div>
            );
          })}
        </div>
        <div>
          {this.props.curPage === totalPages ? '' : <button onClick={() => this.setCurPage(this.props.curPage + 1)} className="page-link" >Next</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    pageOfUsers: state.getUsers.pageOfUsers,
    curPage: state.getUsers.curPage,
    pageSize: state.getUsers.pageSize,
    count: state.getUsers.count,
    pageNumber: state.getUsers.pageNumber
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetRedirect: () => {
      dispatch(resetRedirect());
    },
    fetchPage: (page, size) => {
      dispatch(fetchPage(page, size));
    },
    setStatusCurPage: (page) => {
      dispatch(setStatusCurPage(page));
    },
    getCount: () => {
      dispatch(getCount());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);