import { useState, useEffect, useRef } from "react";
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

  const imageBody = (rowData) => (
    <img
      src={rowData.imageUrl}
      alt={rowData.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Datatable Banner</h1>
            </div>
          </div>

          <div className="p-6">
            <Toast ref={toast} />
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="p-input-icon-left w-full md:w-80">
                    <i className="pi pi-search text-gray-400" />
                    <InputText
                      type="search"
                      className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={globalFilter || ""}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      placeholder="Cari data..."
                    />
                  </span>
                  <h2 className="text-xl font-semibold text-gray-700">Semua Banner</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    label="Hapus"
                    icon="pi pi-trash"
                    severity="danger"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
                    raised
                    onClick={confirmDeleteAllBanner}
                  />
                  <Button
                    label="Tambah"
                    icon="pi pi-plus"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                    raised
                    onClick={() => FormBanner()}
                  />
                </div>
              </div>
              <DataTable
                value={banners}
                paginator
                dataKey="idBanner"
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
              className="p-datatable-sm"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column field="idBanner" header="ID Banner" sortable style={{ minWidth: "10rem" }} />
              <Column field="namaBanner" header="Nama Banner" sortable style={{ minWidth: "10rem" }} />
              <Column field="imageUrl" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} />
              <Column header="Aksi" exportable={false} style={{ minWidth: "5rem" }} body={actionButtonBanner} />
            </DataTable>
            </div>
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
