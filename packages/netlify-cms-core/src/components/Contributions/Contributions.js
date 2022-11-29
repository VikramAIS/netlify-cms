import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import ContributonsModal from './ContributonsModal';
import {
  openContributionsList as openContributionsAction,
  closeContributionsList as closeContributionsAction,
  contributionChange as onContributionChangeAction,
  createContributionOpen as onCreateContributionOpenAction
} from '../../actions/contributions'

class Contributions extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    currentBranch: PropTypes.string,
    newBranchName: PropTypes.string,
    branchList: PropTypes.array,
    t: PropTypes.func.isRequired,
  };


  state = {
    newBranchName: '',
    isFiltered: false,
    filterdBranches: [],
    query: ''
  };

  componentDidMount() {
    this.setState()
    this.props.openContributions();
  }


  componentDidUpdate(prevProps) {
    const isOpening = !prevProps.isVisible && this.props.isVisible;

    if (isOpening) {
      this.props.openContributions();
    }
  }

  handleOnNewBranchChange = event => {
    const brachName = event.target.value
    this.setState(prevState => { return { newBranchName: brachName, query: prevState.query, isFiltered: false, filterdBranches: prevState.branchList } });
  };

  handleCreateContribution = () => {
    this.props.onCreateContributionOpen(this.state.newBranchName);
    this.setState(prevState => { return { newBranchName: '', query: prevState.query, isFiltered: false, filterdBranches: this.props.branchList } });
  }

  handleOnSearchChange = event => {
    const query = event.target.value;
    if (query.length > 0) {
      this.setState({ newBranchName: '', query, isFiltered: true, filterdBranches: this.props.branchList.filter(str => str.includes(query)) });
    } else {
      this.setState({ newBranchName: '', query:'', isFiltered: false, filterdBranches: this.props.branchList });
    }
  }

  render() {
    const { isVisible, isLoading, closeContributions, onContributionChange, currentBranch, branchList, query } = this.props;

    return (
      <ContributonsModal
        handleClose={closeContributions}
        onContributionChange={onContributionChange}
        onCreateContributionOpen={this.handleCreateContribution}
        isVisible={isVisible}
        isLoading={isLoading}
        currentBranch={currentBranch}
        newBranchName={this.state.newBranchName}
        branchList={this.state.isFiltered ? this.state.filterdBranches : branchList}
        onNewBranchChange={this.handleOnNewBranchChange}
        query={query}
        onSearchChange={this.handleOnSearchChange}
      />
    );
  }
}

function mapStateToProps(state) {
  const { contributions } = state;
  const contributionProps = {
    isVisible: contributions.isVisible,
    currentBranch: contributions.currentBranch,
    branchList: contributions.branchList
  };
  return { ...contributionProps };
}

const mapDispatchToProps = {
  openContributions: openContributionsAction,
  closeContributions: closeContributionsAction,
  onContributionChange: onContributionChangeAction,
  onCreateContributionOpen: onCreateContributionOpenAction
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Contributions));
