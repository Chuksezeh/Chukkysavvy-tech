import AdminDashboard from "../adminDashboard";
import React, { useEffect, useState, useMemo } from "react";
import { Table, Badge, Button, Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import { chukkytechAxios } from "../../Utility/axios";
import useGetData from "../../Utility/getFunction";

const ITEMS_PER_PAGE = 20;

const ProductPurchaseReport = () => {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const fetchPaymentLogs = async () => {
    try {
      setLoading(true);
      const res = await chukkytechAxios.get("payments/getAllPaymentLog");
      setPaymentLogs(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching payment logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const { data: userData } = useGetData("/auth/getAllUsers");

  /** 🔹 Map users */
  const usersMap = useMemo(() => {
    if (!userData) return {};
    return userData.reduce((acc, user) => {
      acc[user.userId] = `${user.firstName} ${user.lastName} / ${user.email}`;
      return acc;
    }, {});
  }, [userData]);

  /** 🔹 Currency formatter */
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "-";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  /** 🔹 Status badge */
  const getStatusBadge = (status) => {
    const variants = {
      attempted: "warning",
      completed: "primary",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
  };

  /** 🔹 Only product purchase payments */
  const productPaymentLogs = paymentLogs.filter(
    (payment) => payment.transactionType === "product-order-payment"
  );

  /** 🔹 Search + Filter */
  const filteredLogs = productPaymentLogs.filter((item) => {
    const userName = usersMap[item.userId]?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.repairOrderCode?.toLowerCase().includes(search) ||
      item.transactionId?.toLowerCase().includes(search) ||
      userName.includes(search);

    const matchesStatus =
      statusFilter === "all" || item.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /** 🔹 Pagination */
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <AdminDashboard />

      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-1">Product Purchase Payment Log</h4>
            <p className="text-muted mb-0">
              View and track all product (device) order payment records
            </p>
          </div>
        </div>

        <div className="shadow-sm">
          <div className="card-body">
            {/* 🔍 Search & Filter */}
            <div className="row mb-3 g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by order code, transaction ID or user name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Payment Status</option>
                  <option value="completed">Completed</option>
                  <option value="attempted">Attempted</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading payment logs...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                                 <Table hover bordered className="align-middle">
                                   <thead className="table-light">
                                     <tr>
                                       <th>#</th>
                                       <th>Order Code</th>
                                       <th>Order Payment ID</th>
                                       {/* <th>Repair Order ID</th> */}
                                       <th>Payment Reference</th>
                                       <th>User</th>
                                       <th>Transaction Type</th>
                                       <th>Amount</th>
                                       <th>Created Date</th>
                                       <th>Completed Date</th>
                                       <th>Status</th>
                                       <th>Action</th>
                                     </tr>
                                   </thead>
               
                                   <tbody>
                                     {paginatedLogs.length === 0 ? (
                                       <tr>
                                         <td colSpan="12" className="text-center py-4">
                                           No matching payment records found
                                         </td>
                                       </tr>
                                     ) : (
                                       paginatedLogs.map((item, index) => (
                                         <tr key={item.repairPaymentId}>
                                           <td>
                                             {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                           </td>
                                           <td className="fw-semibold" data-label ="order code">
                                             {item.repairOrderCode}
                                           </td>
                                           <td data-label="order payment id">{item.orderPaymentId}</td>
                                           {/* <td data-label="order id">{item.repairOrderId}</td> */}
                                           <td data-label="payment reference">{item.transactionId}</td>
                                           <td data-label="user">{usersMap[item.userId] || "Unknown User"}</td>
                                           <td data-label="transaction type">{item.transactionType}</td>
                                           <td className="fw-bold" data-label="amount">
                                             {formatCurrency(item.amount)}
                                           </td>
                                           <td data-label="created date"> 
                                             {moment(item.createdDateTime).format(
                                               "MMM D, YYYY • h:mm A"
                                             )}
                                           </td>
                                           <td data-label="completed date">
                                             {moment(item.updatedDateTime).format(
                                               "MMM D, YYYY • h:mm A"
                                             )  } 
                                           </td>
                                           <td data-label="payment status">{getStatusBadge(item.paymentStatus)}</td>
                                           <td data-label="action">
                                             <Button size="sm" variant="outline-primary">
                                               <FaEye /> View
                                             </Button>
                                           </td>
                                         </tr>
                                       ))
                                     )}
                                   </tbody>
                                 </Table>
                               </div>

                {/* 🔢 Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-muted">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} –{" "}
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredLogs.length
                      )}{" "}
                      of {filteredLogs.length}
                    </small>

                    <div className="btn-group">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPurchaseReport;
