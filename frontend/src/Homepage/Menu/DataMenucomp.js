import { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import AvailableMenu from "./AvailableMenu";
import NotAvailableMenu from "./NotAvailableMenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";

const DEFAULT_MENU = {
  imageFile: "",
  hargaMenu: "",
  stokMenu: "",
  deskripsiMenu: "",
  kategoriMenu: "",
  namaMenu: "",
};

const DataMenucomp = ({ data = [], kategori = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(data ?? []);
  }, [data]);

  const hideDialog = () => {
    setProductDialog(false);
  };

  const openForm = (selectedMenu = {}) => {
    setMenu((current) => ({ ...current, ...selectedMenu }));
    setProductDialog(true);
  };

  const confirmDeleteSelected = (selectedMenu) => {
    setMenu((current) => ({ ...current, ...selectedMenu }));
    setDeleteMenuDialog(true);
  };

  const onSubmit = () => {
    if (menu.idMenu) {
      setMenus((prev) =>
        prev.map((item) =>
          item.idMenu === menu.idMenu
            ? {
                ...item,
                ...menu,
                imageUrl:
                  menu.imageUrl ||
                  (menu.imageFile?.name
                    ? URL.createObjectURL(menu.imageFile)
                    : item.imageUrl),
                updatedAt: new Date().toISOString(),
              }
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
      const nextId = menus.reduce((max, item) => Math.max(max, item.idMenu || 0), 0) + 1;
      const newMenu = {
        ...menu,
        idMenu: nextId,
        imageUrl:
          menu.imageUrl ||
          (menu.imageFile?.name ? URL.createObjectURL(menu.imageFile) : "/placeholder.png"),
        updatedAt: new Date().toISOString(),
      };
      setMenus((prev) => [...prev, newMenu]);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Berhasil Disimpan",
        life: 3000,
      });
    }

    setProductDialog(false);
    setMenu(DEFAULT_MENU);
  };

  const EksporToSpreadsheet = () => {
    toast.current.show({
      severity: "info",
      summary: "Ekspor",
      detail: "Fungsi ekspor offline tidak tersedia",
      life: 3000,
    });
  };

  const invoiceUploadHandler = (e) => {
    setMenu((current) => ({ ...current, imageFile: e.files[0] }));
  };

  const confirmDeleteAll = () => {
    setDeleteAllDialog(true);
  };

  const hideDeleteMenuDialog = () => {
    setDeleteMenuDialog(false);
  };

  const hideDeleteAllDialog = () => {
    setDeleteAllDialog(false);
  };

  const deleteMenu = () => {
    setMenus((prev) => prev.filter((item) => item.idMenu !== menu.idMenu));
    setMenu(DEFAULT_MENU);
    setDeleteMenuDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteAll = () => {
    setMenus([]);
    setMenu(DEFAULT_MENU);
    setDeleteAllDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Semua data berhasil dihapus",
      life: 3000,
    });
  };

  const deleteMenuDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteMenuDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteMenu}
      />
    </>
  );

  const deleteAllDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAll}
      />
    </>
  );

  const productDialogFooter = (
    <>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideDialog();
          setMenu(DEFAULT_MENU);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSubmit}
      />
    </>
  );

  const imageBody = (rowData) => (
    <img
      src={rowData.imageUrl}
      alt={rowData.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Menu</h5>
      <div className="flex gap-2">
        <Button
          className="button-tambah"
          label="Tambah Menu"
          icon="pi pi-plus"
          raised
          onClick={() => openForm()}
        />
        <Button
          className="button-spreed"
          label="Ekspor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
          onClick={EksporToSpreadsheet}
        />
        <Button
          className="button-hapus"
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteAll}
        />
        <span className="p-input-icon-left search-i ">
          <i className="pi pi-search" />
          <InputText
            className="button-cari"
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari..."
          />
        </span>
      </div>
    </div>
  );

  const actionTemplate = (menuItem) => (
    <>
      <Button
        label="Edit"
        className="mx-2"
        icon="pi pi-pencil"
        severity="primary"
        rounded
        onClick={() => openForm(menuItem)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteSelected(menuItem)}
      />
    </>
  );

  const bodyTemplate = (rowData) => (
    <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
      {rowData.deskripsiMenu}
    </div>
  );

  return (
    <div className="container">
      <div className="py-4">
        <br />
        <div className="row">
          <div className="col-md-3">
            <div className="title-menu-pertama"> DATATABLE MENU </div>
          </div>
          <div className="col-sm-4">
            <div className="title-menu-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-menu-ketiga"> Data Menu </div>
          </div>
        </div>
        <br /> <br />
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <DataTable
              value={menus}
              paginator
              header={header}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 25]}
              dataKey="idMenu"
              resizableColumns
              showGridlines
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
              globalFilter={globalFilter}
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column field="idMenu" header="ID Menu" sortable style={{ minWidth: "10rem" }} />
              <Column field="namaMenu" header="Nama Menu" sortable style={{ minWidth: "10rem" }} />
              <Column field="hargaMenu" header="Harga Menu" sortable style={{ minWidth: "10rem" }} />
              <Column field="stokMenu" header="Stok Menu" sortable style={{ minWidth: "10rem" }} />
              <Column
                field="deskripsiMenu"
                header="Deskripsi Menu"
                sortable
                style={{ maxWidth: 220 }}
                body={bodyTemplate}
              />
              <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ minWidth: "10rem" }} />
              <Column field="imageUrl" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} />
              <Column header="Aksi" exportable={false} style={{ minWidth: "12rem" }} body={actionTemplate} />
            </DataTable>
          </div>
          <br />
          <AvailableMenu data={menus} />
          <br />
          <NotAvailableMenu data={menus} />

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header={menu.idMenu ? "Detail Menu" : "Tambah Menu"}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={() => {
              hideDialog();
              setMenu(DEFAULT_MENU);
            }}
          >
            {menu.imageUrl && (
              <img
                src={menu.imageUrl}
                alt={menu.namaMenu}
                className="w-full m-auto mb-3"
                style={{ borderRadius: "8px" }}
              />
            )}
            <div className="field">
              <label htmlFor="name">Name Menu</label>
              <InputText
                id="name"
                value={menu.namaMenu}
                onChange={(e) => setMenu((current) => ({ ...current, namaMenu: e.target.value }))}
                required
                autoFocus
              />
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Harga</label>
                <InputText
                  id="price"
                  value={menu.hargaMenu}
                  onChange={(e) => setMenu((current) => ({ ...current, hargaMenu: e.target.value }))}
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity" className="font-bold">
                  Stok
                </label>
                <InputText
                  id="quantity"
                  value={menu.stokMenu}
                  onChange={(e) => setMenu((current) => ({ ...current, stokMenu: e.target.value }))}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="description">Deskripsi</label>
              <InputTextarea
                id="description"
                value={menu.deskripsiMenu}
                onChange={(e) => setMenu((current) => ({ ...current, deskripsiMenu: e.target.value }))}
                required
                rows={3}
                cols={20}
              />
            </div>
            <div className="field">
              <label htmlFor="category">Kategori</label>
              <Dropdown
                id="category"
                value={menu.kategoriMenu}
                onChange={(e) => setMenu((current) => ({ ...current, kategoriMenu: e.value }))}
                options={kategori.map((x) => x.namaKategori)}
                required
                autoFocus
              />
            </div>
            <div className="field">
              <label htmlFor="foto">Image</label>
              <FileUpload
                name="files"
                accept="image/*"
                customUpload={true}
                uploadHandler={invoiceUploadHandler}
                mode="basic"
                auto={true}
                chooseLabel={menu.imageFile?.name ?? "Tambah Foto"}
              />
            </div>
          </Dialog>
          <Dialog
            visible={deleteMenuDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteMenuDialogFooter}
            onHide={hideDeleteMenuDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              {menu && (
                <span>
                  Apakah anda yakin ingin menghapus <b>{menu.namaMenu}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteAllDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllDialogFooter}
            onHide={hideDeleteAllDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>semua menu</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataMenucomp;
