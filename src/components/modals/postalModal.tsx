import React from 'react';
import { Modal } from 'react-bootstrap';
import { PostalModal as PostalModalInterface } from '../../interfaces/modal';

export default function PostalModel(props: PostalModalInterface) {
    const { close, open, title } = props;
    return (
        <Modal show={open} onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body >

            </Modal.Body>
            <Modal.Footer>

        </Modal.Footer>
        </Modal>
    );
}
