import React from 'react';

const EmailTemplate = ({ firstName, contenido }) => (
    <div>
        <h1>Hola, {firstName}!</h1>
        <div dangerouslySetInnerHTML={{ __html: contenido }} />
    </div>
);

export default EmailTemplate;


