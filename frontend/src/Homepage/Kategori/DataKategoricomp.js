import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

const DEFAULT_KATEGORI = {
  namaKategori: "",
};

const DataKategoricomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteKategDialog, setDeleteKategDialog] = useState(false);
  const [deleteAllKategDialog, setDeleteAllKategDialog] = useState(false);
  const [kategoriDialog, setKategoriDialog] = useState(false);
  const [kategori, setKategori] = useState(DEFAULT_KATEGORI);
  const [kategoris, setKategoris] = useState([]);

  useEffect(() => {
    setKategoris(data);
  }, [data]);

  const hideDeleteKategDialog = () => {
    setDeleteKategDialog(false);
  };

  const hideDeleteAllKategDialog = () => {
    setDeleteAllKategDialog(false);
  };

  const confirmDeleteAllKateg = () => {
    setDeleteAllKategDialog(true);
  };

  const confirmDeleteKategSelected = (selectedMenu) => {
    setKategori(selectedMenu);
    setDeleteKategDialog(true);
  };

  const hideKategDialog = () => {
    setKategoriDialog(false);
  };

  const SubmitKateg = () => {
    if (kategori.idKategori) {
      setKategoris((prev) =>
        prev.map((item) =>
          item.idKategori === kategori.idKategori
            ? { ...item, ...kategori }
            : item
        )
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Berhasil Disimpan",
        life: 3000,
      });
    } else {
      const nextId = kategoris.reduce(
        (max, item) => Math.max(max, item.idKategori || 0),
        0
      ) + 1;
      setKategoris((prev) => [...prev, { ...kategori, idKategori: nextId }]);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Berhasil Disimpan",
        life: 3000,
      });
    }
    setKategoriDialog(false);
    setKategori(DEFAULT_KATEGORI);
  };

  const FormKateg = (selectedMenu = {}) => {
    setKategori((current) => ({ ...current, ...selectedMenu }));
    setKategoriDialog(true);
  };

  const KategoriDialogFooter = (
    <>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideKategDialog();
          setKategori(DEFAULT_KATEGORI);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={SubmitKateg}
      />
    </>
  );

  const deleteAllKateg = () => {
    setKategoris([]);
    setKategori(DEFAULT_KATEGORI);
    setDeleteAllKategDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteKateg = () => {
    setKategoris((prev) => prev.filter((item) => item.idKategori !== kategori.idKategori));
    setKategori(DEFAULT_KATEGORI);
    setDeleteKategDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteAllKategDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllKategDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAllKateg}
      />
    </>
  );

  const deleteKategDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteKategDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteKateg}
      />
    </>
  );

  const actionButtonKateg = (kategoriItem) => (
    <>
      <Button
        label="Edit"
        className="mx-2"
        icon="pi pi-pencil"
        rounded
        onClick={() => FormKateg(kategoriItem)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteKategSelected(kategoriItem)}
      />
    </>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <div className="py-4">
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-wider">Datatable Kategori</div>
            </div>
          </div>

          <div>
            <Toast ref={toast} />
            <div className="mb-8 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                <div className="text-base font-bold text-gray-900">Semua Kategori</div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="button-hapus"
                    label="Hapus"
                    icon="pi pi-trash"
                    severity="danger"
                    raised
                    onClick={confirmDeleteAllKateg}
                  />
                  <Button
                    className="button-tambah"
                    label="Tambah"
                    icon="pi pi-plus"
                    raised
                    onClick={() => FormKateg()}
                  />
                </div>
                <span className="relative w-full md:w-auto">
                  <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <InputText
                    type="search"
                    className="w-full px-4 py-3 pl-11 rounded-full border border-gray-300 bg-slate-50"
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari data..."
                  />
                </span>
              </div>
              <DataTable
                value={kategoris}
                paginator
                dataKey="idKategori"
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 25]}
              resizableColumns
              showGridlines
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
              globalFilter={globalFilter}
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column field="idKategori" header="ID Kategori" sortable style={{ minWidth: "10rem" }} />
              <Column field="namaKategori" header="Nama Kategori" sortable style={{ minWidth: "10rem" }} />
              <Column header="Aksi" exportable={false} style={{ minWidth: "12rem" }} body={actionButtonKateg} />
            </DataTable>
            </div>
          </div>

          <Dialog
            visible={kategoriDialog}
            style={{ width: "450px" }}
            header={kategori.idKategori ? "Edit Kategori" : "Tambah Kategori"}
            modal
            className="p-fluid"
            footer={KategoriDialogFooter}
            onHide={() => {
              hideKategDialog();
              setKategori(DEFAULT_KATEGORI);
            }}
          >
            <div className="field">
              <label htmlFor="name">Nama Kategori</label>
              <InputText
                id="name"
                value={kategori.namaKategori}
                onChange={(e) => setKategori((current) => ({ ...current, namaKategori: e.target.value }))}
                required
                autoFocus
              />
            </div>
          </Dialog>

          <Dialog
            visible={deleteAllKategDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllKategDialogFooter}
            onHide={hideDeleteAllKategDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>semua kategori</b>?
              </span>
            </div>
          </Dialog>

          <Dialog
            visible={deleteKategDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteKategDialogFooter}
            onHide={hideDeleteKategDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>{kategori.namaKategori}</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataKategoricomp;
