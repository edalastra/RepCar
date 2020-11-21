import React from 'react';


const ModalComponent = ({ buttonLabel, header, content, confirmation, btnconfirmation }) => {
    return (
        <>
            <a class="waves-effect waves-light modal-trigger btn red darken-4" href="#modal1">{buttonLabel}</a>

            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>{header}</h4>
                    <div>
                        {content}
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={btnconfirmation}>{confirmation}</a>
                </div>
            </div>
        </>
    );
}

export default ModalComponent;