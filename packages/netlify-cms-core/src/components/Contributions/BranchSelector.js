import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon, buttons, lengths, colors, zIndex } from 'netlify-cms-ui-default';
import { css } from '@emotion/core';

const styles = {
    button: css`
    ${buttons.button};
    ${buttons.default};
    display: inline-block;
    margin-left: 15px;
    margin-right: 2px;

    &[disabled] {
      ${buttons.disabled};
      cursor: default;
    }
  `,
};

const StyledSelector = styled.div`
text-align:left;
color: #000;
padding: 10px 5px;
border-bottom:1px solid #ccc;
border-radius:1px;
&:hover {
    background-color:#ccc;
    cursor: pointer;
  }
`;

const SelectorContainer = styled.div`
max-height:90%;
overflow: auto;       
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display:flex;
`;

const NewBranchInput = styled.input`
  height:36px;
  background-color: #eff0f4;
  border-radius: ${lengths.borderRadius};

  font-size: 14px;
  padding: 10px 6px 10px 32px;
  width: 70%;
  position: relative;
  z-index: ${zIndex.zIndex1};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${colors.active};
  }
`;

export const InsertButton = styled.button`
  ${styles.button};
  ${buttons.green};
  width: 30%;
`;

function BranchSelector({
    branchList,
    currentBranch,
    onChange,
    newBranchName,
    onCreateContributionOpen,
    onNewBranchChange
}) {


    return (
        <>
            <SelectorContainer>
                {branchList && branchList.length === 0 && (
                    <div>
                        No branches to display
                    </div>
                )}
                {branchList && branchList.length > 0 && branchList.map((branch) => {
                    const isCurrentBranch = branch === currentBranch
                    return (
                        <StyledSelector key={branch} onClick={() => onChange(branch)} >
                            {branch}
                            {isCurrentBranch && (
                                <span>{` (current)`}</span>
                            )}
                        </StyledSelector>
                    )
                })
                }
            </SelectorContainer>
            <ButtonsContainer>
                <NewBranchInput value={newBranchName} onChange={onNewBranchChange} placeholder={"New contribution name..."}></NewBranchInput>
                <InsertButton onClick={() => onCreateContributionOpen(newBranchName)}>
                    New Contribution</InsertButton>
            </ButtonsContainer>
        </>
    );
}

BranchSelector.propTypes = {
    branchList: PropTypes.array,
    currentBranch: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onCreateContributionOpen: PropTypes.func,
    newBranchName: PropTypes.string,
    onNewBranchChange: PropTypes.func.isRequired
};

export default BranchSelector;