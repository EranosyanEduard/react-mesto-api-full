import React from 'react';
import Header from './Header';
import Content from './Content';
import SignWithForm from './SignWithForm';
import InfoTooltip from './InfoTooltip';

function AuthPage(props) {
  const {
    pageType,
    onRedirectButton,
    onSubmit,
    tooltipTypeFailureProps,
    tooltipTypeSuccessProps
  } = props;

  const contentChildren = (
    <SignWithForm
      pageType={pageType}
      onSubmit={onSubmit}
    />
  );

  return (
    <>
      <Header
        pageType={pageType}
        onRedirectButton={onRedirectButton}
      />
      <Content children={contentChildren} />
      <InfoTooltip
        pageType={pageType}
        isSuccessful={false}
        {...tooltipTypeFailureProps}
      />
      <InfoTooltip
        pageType={pageType}
        isSuccessful={true}
        {...tooltipTypeSuccessProps}
      />
    </>
  );
}

export default AuthPage;
