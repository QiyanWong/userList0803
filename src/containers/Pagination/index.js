import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage, getCount, setStatusCurPage, resetRedirect } from '../../redux/action-creators';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: []
    };
  }

  componentDidMount() {
  //   this.setCurPage(1);
  //  this.props.resetRedirect();
  }

  //一会加上
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.page.count !== prevProps.page.count) {
  //     this.setCurPage(this.props.status.curPage);
  //   }
  // }

  setCurPage = curPage => {
    //const { dispatch } = this.props;
    // this.props.getCount();
    this.props.fetchPage(curPage, 5);
    // this.props.setStatusCurPage(curPage);
    // dispatch(fetchPage(curPage, 5));
    // dispatch(setStatusCurPage(curPage));
    const { pageSize } = this.props.page.pageSize;
    const { count } = this.props.page.count;
    const pageNumber = [];
    
    const totalPages = Math.ceil(count / pageSize);
    let startPage = 1, endPage = totalPages;
    for (let i = startPage; i <= endPage; i++) {
      pageNumber.push(i);
    }
    this.setState({ pageNumber });
  };



  render() {
    const pageProp = this.props.page;
    const pageNumber = this.state.pageNumber;
    const { count } = pageProp.count;
    const { pageSize } = pageProp.pageSize;
    const totalPages = Math.ceil(count / pageSize);
    return (
      <ul className="pagination">
        <li className="page-item">
          {pageProp.curPage === 1 ? '' : <a className="page-link" onClick={() => this.setCurPage(pageProp.curPage - 1)} >Previous</a>}
        </li>
        {pageNumber.map(page => {
          return (
            <li key={page} className="page-item">
              <a onClick={() => this.setCurPage(page)} className="page-link">{page}</a>
            </li>
          );
        })}
        <li className="page-item">
          {pageProp.curPage === totalPages ? '' : <a onClick={() => this.setCurPage(pageProp.curPage + 1)} className="page-link" >Next</a>}
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.getUsers,
    status: state.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetRedirect: () => {
      dispatch(resetRedirect());
    },
    getCount: () => {
      dispatch(getCount());
    },
    fetchPage: (page, size) => {
      dispatch(fetchPage(page, size));
    },
    setStatusCurPage: (page) => {
      dispatch(setStatusCurPage(page));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);