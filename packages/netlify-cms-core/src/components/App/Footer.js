import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { translate } from 'react-polyglot';
import {
  colors,
  lengths,
  shadows,
  zIndex,
} from 'netlify-cms-ui-default';
import { connect } from 'react-redux';

import { checkBackendStatus } from '../../actions/status';

function AppFooter(props) {
  return (
    <header
      css={css`
        ${shadows.dropMain};
        position: fixed;
        width: 100%;
        bottom: 0px;
        background-color: ${colors.headerBackgound};
        z-index: ${zIndex.zIndex300};
        height: ${lengths.topBarHeight};
      `}
      {...props}
    />
  );
}

const AppFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 800px;
  max-width: 1440px;
  padding: 0 12px;
  margin: 0 auto;
  color: #fff;
  line-height: 50px;
`;

class Footer extends React.Component {
  static propTypes = {
    footerText: PropTypes.string
  };

  render() {
    const {
      footerText
    } = this.props;


    return (
      <AppFooter>
        <AppFooterContent>
         {footerText}        
         </AppFooterContent>
      </AppFooter>
    );
  }
}

const mapDispatchToProps = {
  checkBackendStatus,
};

export default connect(null, mapDispatchToProps)(translate()(Footer));
