import React, { Component } from 'react';
import css from './Photo.module.css'

class Photo extends Component {
    modal;
    modalImage;
    constructor(props) {
        super(props)
        this.modal = React.createRef()
        this.modalImage = React.createRef()
    }

    likePhoto(id) {
        console.log(id)
    }

    postComment(id) {
        console.log(id)
    }

    openImage(url) {
        this.modalImage.current.src = url;
        this.modal.current.style.display = "block";
    }

    closeModal(e) {
        if (e.target == this.modal.current) {
            this.modal.current.style.display = "none"
        }
    }

    render() {
        const data = this.props.data;
        return (
            <div className={css.container}>
                <img onClick={() => { this.openImage(data.url) }} className={css.image} src={data.url} alt={data.id}></img>

                <div className={css.content}>
                    <div className={css.likeBlock}>
                        <span className={css.likes}>{data.likes}</span> <u className={css.like} onClick={() => { this.likePhoto(data.id) }}>Like</u>
                    </div>
                    <div className={css.category}>
                        <span className={css.categoryColor}>{data.category}</span>
                    </div>
                </div>

                <div className={css.postComment}>
                    <div className={css.commentInput}>
                        <input className={css.input} type="text" placeholder="Type your comment here ..."></input>
                    </div>
                    <div className={css.post} onClick={() => { this.postComment(data.id) }}>
                        <span>POST</span>
                    </div>
                </div>

                <div>
                    {data.comments.map((i) => {
                        return <p key={i} className={css.comment}>{i}</p>
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