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

  const header = (
    <div className="menu-table-header-secondary">
      <span className="p-input-icon-left search-card-small">
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
    <div>
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
        scrollHeight="400px"
        globalFilter={globalFilter}
        currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
      >
        <Column field="idMenu" header="ID Menu" sortable style={{ minWidth: "8rem" }} />
        <Column field="namaMenu" header="Nama Menu" sortable style={{ minWidth: "12rem" }} />
        <Column field="hargaMenu" header="Harga Menu" sortable style={{ minWidth: "10rem" }} />
        <Column field="stokMenu" header="Stok Menu" sortable style={{ minWidth: "8rem" }} />
        <Column
          field="deskripsiMenu"
          header="Deskripsi Menu"
          sortable
          style={{ minWidth: "14rem" }}
          body={bodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default AvailableMenu;
