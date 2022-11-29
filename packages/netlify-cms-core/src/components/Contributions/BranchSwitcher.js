import React from 'react';
import PropTypes from 'prop-types';

import BranchSelector from './BranchSelector';

function BranchSwitcher({
    onContributionChange,
    currentBranch,
    branchList,
    newBranchName,
    onCreateContributionOpen,
    onNewBranchChange }) {

    return (

        <BranchSelector newBranchName={newBranchName}
            onNewBranchChange={onNewBranchChange}
            onCreateContributionOpen={onCreateContributionOpen}
            branchList={branchList} currentBranch={currentBranch} onChange={onContributionChange} />
    );
}

BranchSwitcher.propTypes = {
    onContributionChange: PropTypes.func.isRequired,
    currentBranch: PropTypes.string,
    branchList: PropTypes.array,
    onCreateContributionOpen: PropTypes.func,
    newBranchName: PropTypes.string,
    onNewBranchChange: PropTypes.func.isRequired
};


export default BranchSwitcher;