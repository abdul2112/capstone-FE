import React from 'react';
import { Col, Row } from 'react-bootstrap';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      {/* <p> © 2021 Movie App Inc.</p> */}
      <Row>
        <Col xs={12} className="text-left mb-2 mt-2 copyright">
          <b> © 2021 Movie App Inc. </b>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
