import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";

const NotAvailableMenu = ({ data = [] }) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const unavailableItems = data.filter((item) => Number(item.stokMenu) <= 0);

  const bodyTemplate = (rowData) => (
    <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
      {rowData.deskripsiMenu}
    </div>
  );

  const header = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
      <div className="w-full md:w-72 relative">
        <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <InputText
          type="search"
          className="w-full rounded-full border border-slate-200 bg-white py-2 pl-11 pr-4 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
        />
      </div>
    </div>
  );

  return (
    <div>
      <DataTable
        value={unavailableItems}
        paginator
        header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 25]}
        dataKey="idMenu"
        resizableColumns
        showGridlines
        stripedRows
        className="p-datatable-sm"
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

export default NotAvailableMenu;
