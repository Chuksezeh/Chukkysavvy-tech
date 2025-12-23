import AdminDashboard from "../adminDashboard";
import React, { useEffect, useState } from "react";
import { Table, Badge, Button, Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import { chukkytechAxios } from "../../Utility/axios";

const RepairOrderReport = () => {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const fetchPaymentLogs = async () => {
    try {
      setLoading(true);
      const res = await chukkytechAxios.get("repair-payment/get-all");
      setPaymentLogs(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching payment logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "-";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      paid: "success",
      cancelled: "secondary",
    };
    return <Badge bg={variants[status] || "primary"}>{status}</Badge>;
  };

  return (
    <>
      <AdminDashboard />

      <div className="container-fluid mt-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-1">Repair Order Payment Log</h4>
            <p className="text-muted mb-0">
              View and track all repair order payment records
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className=" shadow-sm">
          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading payment logs...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover bordered className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Order Code</th>
                      <th>Inspection</th>
                      <th>Repair</th>
                      <th>Parts</th>
                      <th>Pickup</th>
                      <th>Delivery</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paymentLogs.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="text-center py-4">
                          No payment records found
                        </td>
                      </tr>
                    ) : (
                      paymentLogs.map((item, index) => (
                        <tr key={item.repairPaymentId}>
                          <td>{index + 1}</td>
                          <td className="fw-semibold">
                            {item.repairOrderCode}
                          </td>
                          <td>{formatCurrency(item.inspectionFee)}</td>
                          <td>{formatCurrency(item.repairFee)}</td>
                          <td>{formatCurrency(item.replacementPartsFee)}</td>
                          <td>{formatCurrency(item.pickupFee)}</td>
                          <td>{formatCurrency(item.deliveryFee)}</td>
                          <td className="fw-bold">
                            {formatCurrency(item.totalAmount)}
                          </td>
                          <td>{getStatusBadge(item.status)}</td>
                          <td>
                            {moment(item.createdDateTime).format(
                              "MMM D, YYYY • h:mm A"
                            )}
                          </td>
                          <td>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepairOrderReport;
