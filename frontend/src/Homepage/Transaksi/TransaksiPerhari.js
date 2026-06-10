import { useState } from "react";
import "../../Utils/Crud.css";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";

const TransaksiPerhari = ({ data = [] }) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const todayData = data.filter((item) => item.tanggal?.startsWith(today));

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
    <div className="datatable-crud-demo">
      <div className="card">
        <DataTable
          value={todayData}
          paginator
          header={header}
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
          <Column field="idTransaksi" header="ID Transaksi" sortable style={{ minWidth: "10rem" }} />
          <Column field="namaPelanggan" header="Nama Pelanggan" sortable style={{ minWidth: "10rem" }} />
          <Column field="tanggal" header="Tanggal" sortable style={{ minWidth: "10rem" }} />
          <Column field="totalHarga" header="Total Harga" sortable style={{ minWidth: "10rem" }} />
          <Column field="statusBayar" header="Status Bayar" sortable style={{ minWidth: "10rem" }} />
        </DataTable>
      </div>
    </div>
  );
};

export default TransaksiPerhari;
