import React, { useState } from "react";
import "../../Utils/Crud.css";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";

const AvailableMenu = ({ data = [] }) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const availableItems = data.filter((item) => Number(item.stokMenu) > 0);

  const bodyTemplate = (rowData) => (
    <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
      {rowData.deskripsiMenu}
    </div>
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
      <h5 className="mx-0 my-1">Menu Tersedia</h5>
      <span className="p-input-icon-left search-y">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
        />
      </span>
    </div>
  );

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <DataTable
          value={availableItems}
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
        </DataTable>
      </div>
    </div>
  );
};

export default AvailableMenu;
