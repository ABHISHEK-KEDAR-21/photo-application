import React, { Component } from 'react';
import css from './Photo.module.css'

class Photo extends Component {
    modal;
    modalImage;
    constructor(props) {
        super(props)
        this.modal = React.createRef()
        this.modalImage = React.createRef()
        this.state = {
            ...props.data,
            comment: ''
        }
    }

    likePhoto(photo) {
        // console.log(photo)
        if (this.state.showLike)
            this.setState({ likes: photo.likes + 1, showLike: false }, () => this.props.updatePic(this.state))
        else
            this.setState({ likes: photo.likes - 1, showLike: true }, () => this.props.updatePic(this.state))

    }

    postComment(photo) {
        if (this.state.comment) {
            // console.log(photo)
            photo.comments.push(this.state.comment)
            photo.comment = ''
            this.setState({ ...photo }, () => this.props.updatePic(photo))
        }
    }

    openImage(url) {
        this.modalImage.current.src = url;
        this.modal.current.style.display = "block";
    }

    closeModal(e) {
        if (e.target === this.modal.current) {
            this.modal.current.style.display = "none"
        }
    }

    render() {
        const data = this.state;
        // console.log(this.state)
        return (
            <div className={css.container}>
                <img onClick={() => { this.openImage(data.url) }} className={css.image} src={data.url} alt={data.id}></img>

                <div className={css.content}>
                    <div className={css.likeBlock}>
                        <span className={css.likes}>{data.likes}</span> <u className={css.like} onClick={() => { this.likePhoto(data) }}>{data.showLike ? 'Like' : 'Unlike'}</u>
                    </div>
                    <div className={css.category}>
                        <span className={css.categoryColor}>{data.category}</span>
                    </div>
                </div>

                <div className={css.postComment}>
                    <div className={css.commentInput}>
                        <input value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} className={css.input} type="text" placeholder="Type your comment here ..." onKeyDown={(e) => { if (e.key === 'Enter') { this.postComment(data) } }}></input>
                    </div>
                    <div className={css.post} onClick={() => { this.postComment(data) }}>
                        <span>POST</span>
                    </div>
                </div>

                <div className={css.commentSection}>
                    {data.comments.map((i, idx) => {
                        return <p key={`${i}${idx}`} className={css.comment}>{i}</p>
                    })}
                </div>

                <div id="myModal" className="modal" ref={this.modal} onClick={(e) => { this.closeModal(e) }}>
                    <img className="modal-content" id="img01" alt="modal" ref={this.modalImage} />
                </div>
            </div>
        )
    }
}

export default Photo;