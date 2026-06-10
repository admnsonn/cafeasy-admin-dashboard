import { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import TransaksiPerhari from "./TransaksiPerhari";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_TRANSAKSI = {
  namaPelanggan: "",
  tanggal: "",
  noMeja: "",
  totalHarga: "",
  statusBayar: "",
};

const DataTransaksicomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteTransaksiDialog, setDeleteTransaksiDialog] = useState(false);
  const [TransaksiDialog, setTransaksiDialog] = useState(false);
  const [transaksi, setTransaksi] = useState(DEFAULT_TRANSAKSI);
  const [dataTransaksi, setdataTransaksi] = useState(data.data ?? []);

  useEffect(() => {
    setdataTransaksi(data.data ?? []);
  }, [data]);

  const openForm = (selectedMenu = {}) => {
    setTransaksi((current) => ({ ...current, ...selectedMenu }));
    setTransaksiDialog(true);
  };

  const statusBody = (rowData) => {
    return (
      <Tag value={rowData.statusBayar} severity={getSeverity(rowData)}></Tag>
    );
  };

  const hideTransaksiDialog = () => {
    setTransaksiDialog(false);
  };

  const confirmDeleteSelected = (selectedMenu) => {
    setTransaksi((current) => ({ ...current, ...selectedMenu }));
    setDeleteTransaksiDialog(true);
  };

  const hideDeleteTransaksiDialog = () => {
    setDeleteTransaksiDialog(false);
  };

  const SubmitTransaksi = () => {
    if (transaksi.idTransaksi) {
      setdataTransaksi((prev) =>
        prev.map((item) =>
          item.idTransaksi === transaksi.idTransaksi
            ? { ...item, ...transaksi }
            : item,
        ),
      );
      setTransaksiDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Berhasil Disimpan",
        life: 3000,
      });
      setTransaksi(DEFAULT_TRANSAKSI);
    }
  };

  const exportSpreadsheet = () => {
    toast.current.show({
      severity: "info",
      summary: "Ekspor",
      detail: "Ekspor offline tidak tersedia",
      life: 3000,
    });
  };

  const deleteTransaksi = () => {
    setdataTransaksi((prev) =>
      prev.filter((item) => item.idTransaksi !== transaksi.idTransaksi),
    );
    setTransaksi(DEFAULT_TRANSAKSI);
    setDeleteTransaksiDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteTransaksiDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTransaksiDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteTransaksi}
      />
    </>
  );

  const getSeverity = (data) => {
    switch (data.statusBayar) {
      case "Sukses Bayar Cash":
      case "SUCCESS":
        return "success";
      case "PENDING":
      case "Pembayaran Dilakukan Di kasir":
        return "warning";
      case "BELUM BAYAR":
        return "danger";
      default:
        return null;
    }
  };

  const actionButtonTransaksi = (transaksiItem) => (
    <>
      <Button
        label="Bayar Cash"
        className="mx-2"
        icon="pi pi-pencil"
        rounded
        onClick={() => openForm(transaksiItem)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteSelected(transaksiItem)}
      />
    </>
  );

  return (
    <div className="container">
      <div className="py-4">
        <div className="page-panel page-panel-menu">
          <div className="page-panel-header">
            <div>
              <div className="page-heading">Datatable Transaksi</div>
            </div>
          </div>

          <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card menu-card">
              <div className="menu-card-top flex flex-column md:flex-row md:align-items-center justify-content-between gap-3">
                <div className="menu-card-title">Semua Transaksi</div>
                <div className="menu-card-actions flex flex-wrap gap-2">
                  <Button
                    className="button-spreed"
                    label="Export"
                    icon="pi pi-file-excel"
                    severity="secondary"
                    raised
                    onClick={exportSpreadsheet}
                  />
                </div>
                <span className="p-input-icon-left search-card w-full md:w-auto">
                  <i className="pi pi-search" />
                  <InputText
                    type="search"
                    className="w-full"
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari data..."
                  />
                </span>
              </div>
              <DataTable
                value={dataTransaksi}
                paginator
                rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 25]}
                dataKey="idTransaksi"
                resizableColumns
                showGridlines
                stripedRows
                tableStyle={{ minWidth: "50rem" }}
                scrollable
                scrollHeight="700px"
                globalFilter={globalFilter}
                currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
              >
                <Column
                  field="idTransaksi"
                  header="ID Transaksi"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="idPelanggan"
                  header="ID Pelanggan"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="namaPelanggan"
                  header="Nama Pelanggan"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="tanggal"
                  header="Tanggal"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="noMeja"
                  header="No Meja"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  field="totalHarga"
                  header="Total Harga"
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  header="Status Bayar"
                  body={statusBody}
                  sortable
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  header="Aksi"
                  exportable={false}
                  style={{ minWidth: "12rem" }}
                  body={actionButtonTransaksi}
                />
              </DataTable>
            </div>
            <div className="table-section-list">
              <div className="table-card">
                <div className="table-card-header">
                  <h5>Transaksi Hari Ini</h5>
                </div>
                <TransaksiPerhari data={data.data ?? []} />
              </div>
            </div>

            <ConfirmPopup
              visible={TransaksiDialog}
              onHide={() => {
                hideTransaksiDialog();
                setTransaksi(DEFAULT_TRANSAKSI);
              }}
              accept={SubmitTransaksi}
              message="Apakah anda ingin mengganti status bayar?"
              icon="pi pi-exclamation-triangle"
            />

            <Dialog
              visible={deleteTransaksiDialog}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Konfirmasi"
              modal
              footer={deleteTransaksiDialogFooter}
              onHide={hideDeleteTransaksiDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {transaksi && (
                  <span>
                    Apakah anda yakin ingin menghapus{" "}
                    <b>{transaksi.namaPelanggan}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTransaksicomp;
