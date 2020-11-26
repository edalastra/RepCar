import React from 'react';


const ModalComponent = ({ buttonLabel, header, content, confirmation, btnconfirmation }) => {
    return (
        <>
            <a className="waves-effect waves-light modal-trigger btn red darken-4" href="#modal1">{buttonLabel}</a>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>{header}</h4>
                    <div>
                        {content}
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" >{confirmation}</a>
                </div>
            </div>
        </>
    );
}

export default ModalComponent;