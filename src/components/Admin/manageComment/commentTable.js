import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import { useNavigate } from "react-router-dom";
import "./manageComments.css";
import { 
  FaComments, 
  FaSearch, 
  FaUser, 
  FaCalendarAlt,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";

const ManageComments = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingComment, setPendingComment] = useState(true);
    const [allComments, setAllComments] = useState([]);
    const [successText, setSuccessText] = useState("");
    const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
    const [showSuppressModal, setShowSuppressModal] = useState(false);
    const [holdCommentData, setHoldCommentData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchComments = async () => {
        try {
            const response = await chukkytechAxios.get("comment/getAllComments");
            setAllComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setPendingComment(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleShowDeleteModal = (comment) => {
        setShowCommentDeleteModal(true);
        setHoldCommentData(comment);
    };

    const handleShowSuppressModal = (comment) => {
        setShowSuppressModal(true);
        setHoldCommentData(comment);
        setErrorMessage(false);
        setSuccessMessage(false);
    };

    const handleDeleteComment = async () => {
        if (!holdCommentData?.commentId) {
            setErrorMessage(true);
            setErrMessage("No comment selected for deletion");
            return;
        }

        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.delete(
                `comment/deleteComment/${holdCommentData.commentId}`
            );

            setSuccessMessage(true);
            setSuccessText(response.data.message || "Comment deleted successfully");
            setShowCommentDeleteModal(false);
            await fetchComments();
        } catch (err) {
            console.error('Deletion failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete comment";
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCommentStatus = async () => {
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        const newStatus = holdCommentData?.status === "active" ? "suppress" : "active";
        const updateData = {
            status: newStatus,
            commentId: holdCommentData?.commentId
        };

        try {
            const response = await chukkytechAxios.put('comment/updateCommentStatus', updateData);
            setSuccessMessage(true);
            setShowSuppressModal(false);
            setSuccessText(response.data.message);
            await fetchComments();
        } catch (err) {
            console.error('Update failed:', err);
            const errorMsg = err.response?.data?.error ||
                err.response?.data?.message ||
                'Failed to update comment status';
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        if (!adminsInfo) {
            navigate('/admin-login');
        }
    }, [navigate]);

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active':
                return 'status-active';
            case 'suppress':
                return 'status-suppressed';
            default:
                return 'status-inactive';
        }
    };

    const filteredComments = allComments.filter(comment => 
        comment.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <AdminDashboard />
            
            <div className="comments-management-container">
                {/* Header */}
                <div className="comments-header">
                    <div className="header-content">
                        <h1>
                            <FaComments className="me-2" />
                            Comments Management
                        </h1>
                        <p>Manage and moderate user comments across the platform</p>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="alert alert-success alert-improved">
                        <FaCheckCircle className="me-2" />
                        <strong>Success!</strong> {successText}
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-error alert-improved">
                        <FaExclamationTriangle className="me-2" />
                        <strong>Error!</strong> {errMessage}
                    </div>
                )}

                {/* Search Bar */}
                <div className="search-container">
                    <h5>Search Comments</h5>
                    <div className="search-form">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, email, title, or comment content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-btn">
                            <FaSearch className="me-2" />
                            Search
                        </button>
                    </div>
                </div>

                {/* Comments Grid */}
                <div className="comments-grid">
                    {pendingComment ? (
                        <div className="loading-state">
                            <div className="loader-circle"></div>
                        </div>
                    ) : filteredComments.length === 0 ? (
                        <div className="empty-state">
                            <FaComments className="empty-icon" />
                            <h3>No Comments Found</h3>
                            <p>
                                {searchTerm ? 
                                    "No comments match your search criteria" : 
                                    "There are no comments to display at the moment"
                                }
                            </p>
                        </div>
                    ) : (
                        filteredComments.map((comment, index) => (
                            <div key={comment.commentId} className="comment-card">
                                <div className="comment-header">
                                    <div className="comment-user">
                                        <div className="user-avatar">
                                            {getInitials(comment.firstName, comment.lastName)}
                                        </div>
                                        <div className="user-info">
                                            <h4>
                                                {comment.firstName} {comment.lastName}
                                            </h4>
                                            <p>{comment.email}</p>
                                        </div>
                                    </div>
                                    <div className="comment-meta">
                                        <div className="comment-date">
                                            <FaCalendarAlt className="me-1" />
                                            {formatDate(comment.createdDateTime)}
                                        </div>
                                        <span className={`status-badge ${getStatusBadgeClass(comment.status)}`}>
                                            {comment.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="comment-content">
                                    <h5 className="comment-title">{comment.title}</h5>
                                    <p className="comment-text">{comment.comment}</p>
                                </div>

                                <div className="comment-actions">
                                    {comment.status === "active" ? (
                                        <button 
                                            className="action-btn btn-suppress"
                                            onClick={() => handleShowSuppressModal(comment)}
                                        >
                                            <FaToggleOff className="me-1" />
                                            Suppress
                                        </button>
                                    ) : (
                                        <button 
                                            className="action-btn btn-activate"
                                            onClick={() => handleShowSuppressModal(comment)}
                                        >
                                            <FaToggleOn className="me-1" />
                                            Activate
                                        </button>
                                    )}
                                    <button 
                                        className="action-btn btn-delete"
                                        onClick={() => handleShowDeleteModal(comment)}
                                    >
                                        <FaTrash className="me-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Stats Summary */}
                {!pendingComment && filteredComments.length > 0 && (
                    <div className="text-center text-muted">
                        <small>
                            Showing {filteredComments.length} of {allComments.length} comments
                        </small>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal 
                show={showCommentDeleteModal} 
                onHide={() => setShowCommentDeleteModal(false)} 
                className="modal-improved"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FaExclamationTriangle size={32} className="text-warning mb-3" />
                    <p>Are you sure you want to delete this comment?</p>
                    <p className="text-muted">
                        This action cannot be undone and the comment will be permanently removed.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        className="btn-modal-cancel"
                        onClick={() => setShowCommentDeleteModal(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="btn-modal-delete"
                        onClick={handleDeleteComment}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Deleting...
                            </>
                        ) : (
                            "Delete Comment"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Suppress/Activate Confirmation Modal */}
            <Modal 
                show={showSuppressModal} 
                onHide={() => setShowSuppressModal(false)} 
                className="modal-improved"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {holdCommentData?.status === "active" ? "Suppress Comment" : "Activate Comment"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {holdCommentData?.status === "active" ? (
                        <>
                            <FaToggleOff size={32} className="text-warning mb-3" />
                            <p>Are you sure you want to <strong>suppress</strong> this comment?</p>
                            <p className="text-muted">
                                The comment will be hidden from public view but can be activated later.
                            </p>
                        </>
                    ) : (
                        <>
                            <FaToggleOn size={32} className="text-success mb-3" />
                            <p>Are you sure you want to <strong>activate</strong> this comment?</p>
                            <p className="text-muted">
                                The comment will be visible to the public.
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        className="btn-modal-cancel"
                        onClick={() => setShowSuppressModal(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="btn-modal-confirm"
                        onClick={handleUpdateCommentStatus}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Updating...
                            </>
                        ) : (
                            holdCommentData?.status === "active" ? "Suppress Comment" : "Activate Comment"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageComments;