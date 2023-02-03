import React from 'react'
import Box from '@mui/material/Box'
import { Modal } from '@mui/material'
import Button from '@mui/material/Button'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};


function CustomModal(props) {
    return (
        <div>
                <Button onClick={props.handleOpen} variant="contained" color="primary" style = {{margin: "0 20px 0 0"}}>{props.buttonName}</Button>
                <Modal
                  open={props.open}
                  onClose={props.handleClose}
                  aria-labelledby="modal-modal-title"
                  s
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {props.component}
                  </Box>
                </Modal>
              </div>
    );
}

export default CustomModal;