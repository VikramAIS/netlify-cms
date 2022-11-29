import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { colors } from 'netlify-cms-ui-default';

import ContributionsTop from './ContributionsTop';
import { Modal } from '../UI';
import BranchSwitcher from './BranchSwitcher';

/**
 * cardWidth + cardMargin * 2 = cardOutsideWidth
 * (not using calc because this will be nested in other calcs)
 */
const cardOutsideWidth = `150px`;

const StyledModal = styled(Modal)`
  display: grid;
  grid-template-rows: 120px auto;
  width: calc(${cardOutsideWidth} + 20px);
  background-color: ${colors.grayDark};

  @media (min-width: 800px) {
    width: calc(${cardOutsideWidth} * 2 + 20px);
  }

  @media (min-width: 1120px) {
    width: calc(${cardOutsideWidth} * 3 + 20px);
  }

  @media (min-width: 1440px) {
    width: calc(${cardOutsideWidth} * 4 + 20px);
  }

  @media (min-width: 1760px) {
    width: calc(${cardOutsideWidth} * 5 + 20px);
  }

  @media (min-width: 2080px) {
    width: calc(${cardOutsideWidth} * 6 + 20px);
  }

  h1 {
    color: #000;
  }

  button:disabled,
  label[disabled] {
    background-color: ${`rgba(217, 217, 217, 0.15)`};
  }
`;

function ContributionsModal({
  t,
  query,
  isVisible,
  currentBranch,
  newBranchName,
  branchList,
  handleClose,
  onContributionChange,
  onCreateContributionOpen,
  onNewBranchChange,
  onSearchChange
}) {
  return (
    <StyledModal isOpen={isVisible} onClose={handleClose}>
      <ContributionsTop
        t={t}
        onClose={handleClose}
        query={query}
        onSearchChange={onSearchChange}
      />
      <BranchSwitcher
        onCreateContributionOpen={onCreateContributionOpen}
        newBranchName={newBranchName}
        onNewBranchChange={onNewBranchChange} currentBranch={currentBranch} branchList={branchList} onContributionChange={onContributionChange}></BranchSwitcher>
    </StyledModal>
  );
}

ContributionsModal.propTypes = {
  t: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentBranch: PropTypes.string,
  newBranchName: PropTypes.string,
  branchList: PropTypes.array,
  handleClose: PropTypes.func.isRequired,
  onContributionChange: PropTypes.func.isRequired,
  onCreateContributionOpen: PropTypes.func,
  onNewBranchChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default translate()(ContributionsModal);
