import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ContributionsSearch from './ContributionsSearch';
import ContributionsHeader from './ContributionsHeader';

const ListTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;



function ContributionsTop({
  t,
  onClose,
  query,
  onSearchChange
}) {
 

  return (
    <ListTop>
      <RowContainer>
        <ContributionsHeader title='Contributions'
          onClose={onClose}
        />
        
             </RowContainer>
      <RowContainer>
        <ContributionsSearch
          value={query}
          onChange={onSearchChange}
          placeholder={t('contributions.contributionsModal.search')}
        />
      </RowContainer>
    </ListTop>
  );
}

ContributionsTop.propTypes = {
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  query: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired
};

export default ContributionsTop;
