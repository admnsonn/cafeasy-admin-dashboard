import { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_BANNER = {
  imageFile: "",
  idBanner: "",
  namaBanner: "",
  imageUrl: "/placeholder.png",
};

const Bannercomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteBannerDialog, setDeleteBannerDialog] = useState(false);
  const [deleteAllBannerDialog, setDeleteAllBannerDialog] = useState(false);
  const [bannerDialog, setBannerDialog] = useState(false);
  const [banner, setBanner] = useState(DEFAULT_BANNER);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setBanners(Array.isArray(data) ? data : data?.data ?? []);
  }, [data]);

  const hideDeleteBannerDialog = () => {
    setDeleteBannerDialog(false);
  };

  const hideDeleteAllBannerDialog = () => {
    setDeleteAllBannerDialog(false);
  };

  const confirmDeleteAllBanner = () => {
    setDeleteAllBannerDialog(true);
  };

  const confirmDeleteBannerSelected = (selectedBanner) => {
    setBanner(selectedBanner);
    setDeleteBannerDialog(true);
  };

  const hideBannerDialog = () => {
    setBannerDialog(false);
  };

  const SubmitBanner = () => {
    if (banner.idBanner) {
      setBanners((prev) =>
        prev.map((item) =>
          item.idBanner === banner.idBanner
            ? { ...item, ...banner, imageUrl: banner.imageUrl || item.imageUrl }
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
      const nextId = banners.reduce((max, item) => Math.max(max, item.idBanner || 0), 0) + 1;
      setBanners((prev) => [
        ...prev,
        {
          ...banner,
          idBanner: nextId,
          imageUrl: banner.imageFile?.name ? URL.createObjectURL(banner.imageFile) : "/placeholder.png",
        },
      ]);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Data Berhasil Disimpan",
        life: 3000,
      });
    }

    setBannerDialog(false);
    setBanner(DEFAULT_BANNER);
  };

  const FormBanner = (selectedBanner = {}) => {
    setBanner((current) => ({ ...current, ...selectedBanner }));
    setBannerDialog(true);
  };

  const invoiceUploadHandler = (e) => {
    setBanner((current) => ({ ...current, imageFile: e.files[0] }));
  };

  const BannerDialogFooter = (
    <>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideBannerDialog();
          setBanner(DEFAULT_BANNER);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={SubmitBanner}
      />
    </>
  );

  const deleteAllBanner = () => {
    setBanners([]);
    setBanner(DEFAULT_BANNER);
    setDeleteAllBannerDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteAllBannerDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllBannerDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAllBanner}
      />
    </>
  );

  const deleteMenuBanner = () => {
    setBanners((prev) => prev.filter((item) => item.idBanner !== banner.idBanner));
    setBanner(DEFAULT_BANNER);
    setDeleteBannerDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Berhasil Dihapus",
      life: 3000,
    });
  };

  const deleteBannerDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteBannerDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteMenuBanner}
      />
    </>
  );

  const actionButtonBanner = (bannerItem) => (
    <>
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteBannerSelected(bannerItem)}
      />
    </>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Data Banner</h5>
      <div className="flex gap-2">
        <Button label="Tambah Banner" icon="pi pi-plus" raised onClick={() => FormBanner()} />
        <Button label="Hapus Semua" icon="pi pi-trash" severity="danger" raised onClick={confirmDeleteAllBanner} />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    </div>
  );

  const imageBody = (rowData) => (
    <img
      src={rowData.imageUrl}
      alt={rowData.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

  return (
    <div className="container">
      <div className="py-4">
        <br />
        <div className="row">
          <div className="col-md-3">
            <div className="title-banner-pertama"> DATATABLE BANNER </div>
          </div>
          <div className="col-sm-4">
            <div className="title-banner-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-banner-ketiga"> Data Banner </div>
          </div>
        </div>
        <br /> <br />
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <DataTable
              value={banners}
              paginator
              header={header}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 25]}
              dataKey="idBanner"
              resizableColumns
              showGridlines
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
              globalFilter={globalFilter}
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column field="idBanner" header="ID Banner" sortable style={{ minWidth: "10rem" }} />
              <Column field="namaBanner" header="Nama Banner" sortable style={{ minWidth: "10rem" }} />
              <Column field="imageUrl" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} />
              <Column header="Aksi" exportable={false} style={{ minWidth: "5rem" }} body={actionButtonBanner} />
            </DataTable>
          </div>

          <Dialog
            visible={bannerDialog}
            style={{ width: "450px" }}
            header={banner.namaBanner ? "Edit Banner" : "Tambah Banner"}
            modal
            className="p-fluid"
            footer={BannerDialogFooter}
            onHide={() => {
              hideBannerDialog();
              setBanner(DEFAULT_BANNER);
            }}
          >
            {banner.imageUrl && (
              <img
                src={banner.imageUrl}
                alt={banner.namaBanner}
                className="w-full m-auto mb-3"
                style={{ borderRadius: "8px" }}
              />
            )}
            <div className="field">
              <label htmlFor="name">Name Banner</label>
              <InputText
                id="name"
                value={banner.namaBanner}
                onChange={(e) => setBanner((current) => ({ ...current, namaBanner: e.target.value }))}
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
                chooseLabel={banner.imageFile?.name ?? "Tambah Foto"}
              />
            </div>
          </Dialog>

          <Dialog
            visible={deleteAllBannerDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllBannerDialogFooter}
            onHide={hideDeleteAllBannerDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>semua banner</b>?
              </span>
            </div>
          </Dialog>

          <Dialog
            visible={deleteBannerDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteBannerDialogFooter}
            onHide={hideDeleteBannerDialog}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              <span>
                Apakah anda yakin ingin menghapus <b>{banner.namaBanner}</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Bannercomp;
