import { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DataPelanggancomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteAllPelangganDialog, setDeleteAllPelangganDialog] = useState(false);
  const [pelangganList, setPelangganList] = useState(data.data ?? []);

  useEffect(() => {
    setPelangganList(data.data ?? []);
  }, [data]);

  const hideDeleteAllPelangganDialog = () => {
    setDeleteAllPelangganDialog(false);
  };

  const confirmDeleteAllPelanggan = () => {
    setDeleteAllPelangganDialog(true);
  };

  const deleteAllPelanggan = () => {
    setPelangganList([]);
    setDeleteAllPelangganDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Semua pelanggan berhasil dihapus",
      life: 3000,
    });
  };

  const deleteAllPelangganDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllPelangganDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAllPelanggan}
      />
    </>
  );

  return (
    <div className="container">
      <div className="py-4">
        <div className="page-panel page-panel-menu">
          <div className="page-panel-header">
            <div>
              <div className="page-heading">Datatable Pelanggan</div>
            </div>
          </div>

          <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card menu-card">
              <div className="menu-card-top flex flex-column md:flex-row md:align-items-center justify-content-between gap-3">
                <div className="menu-card-title">Semua Pelanggan</div>
                <div className="menu-card-actions flex flex-wrap gap-2">
                  <Button
                    className="button-hapus"
                    label="Hapus"
                    icon="pi pi-trash"
                    severity="danger"
                    raised
                    onClick={confirmDeleteAllPelanggan}
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
                value={pelangganList}
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
                globalFilter={globalFilter}
              resizableColumns
              showGridlines
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
            >
              <Column field="id" header="ID" sortable style={{ width: "15%" }} />
              <Column field="name" header="Nama" sortable style={{ width: "15%" }} />
            </DataTable>
            </div>
          </div>

          <Dialog
            visible={deleteAllPelangganDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllPelangganDialogFooter}
            onHide={hideDeleteAllPelangganDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>semua pelanggan</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataPelanggancomp;
