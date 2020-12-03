import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import styles from './CreatePost.module.scss'


const CreatePost = ()=> {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
    centered={true}
    open={open}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    trigger={<div className={styles.createPost}>
        <Button title='Add New Post' icon='add' />
      </div>}
    >
      <Modal.Header>Thank you!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Your subscription has been confirmed
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreatePost