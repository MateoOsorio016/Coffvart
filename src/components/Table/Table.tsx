import React, { useState } from 'react';
import { SearchTable } from '../SearchTable/SearchTable';
import { Button } from '../Button/Button';
// import { FaDownload } from 'react-icons/fa';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { ExcelButton } from '../ExcelButton/ExcelButton';
import './Table.css';

interface TableProps {
	data: any[];
	columns: string[];
	dbColumns: string[];
	title?: string;
	label?: string;
	createLink?: string;
	createText?: string;
	editLink?: string;
	editButton?: boolean;
	deleteFunction: (id: string) => void;
	buttonsActions?: any[];
	actionsTableOptions?: boolean;
	tituloDocumento: string;
	nombreArchivo: string;
}

export const Table: React.FC<TableProps> = ({
	data,
	columns,
	dbColumns,
	title,
	label,
	createLink = '/',
	createText,
	editLink = 'edit',
	editButton = true,
	deleteFunction,
	buttonsActions,
	actionsTableOptions = true,
	tituloDocumento,
	nombreArchivo,
}) => {
	const navigate = useNavigate();
	const [searchType, setSearchType] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchType(e.target.value);
	};

	let dataTable: any[] = [];

	if (searchType !== '') {
		dataTable = data.filter((row) => {
			return Object.values(row).some((value: any) =>
				value.toString().toLowerCase().includes(searchType.toLowerCase())
			);
		});
	} else {
		dataTable = data;
	}
	if (searchType !== '') {
		dataTable = data.filter((row) => {
			return Object.values(row).some((value: any) =>
				value.toString().toLowerCase().includes(searchType.toLowerCase())
			);
		});
	} else {
		dataTable = data;
	}

	function redirigir() {
		window.location.href = "/";
	  }

	return (
		<>
		
		<div>
		<button className="btnsesion" onClick={redirigir}>Cerrar sesión</button>
		</div>
			{title && <h1>{title}</h1>}
			<div className='tableContainer'>
			
				{actionsTableOptions && (
					<div className='actionsTable'>
						<div className='left'>
							<ExcelButton
								tituloDocumento={tituloDocumento}
								dataDownload={data}
								nombreArchivo={nombreArchivo}
							/>
							{/* <span className='download'>
								<FaDownload />
							</span> */}
							<Link to={createLink} className='createButton'>
								{createText ? (
									<>
										<IoAddCircleSharp /> {createText}
									</>
								) : (
									<>
										<IoAddCircleSharp /> Crear Nuevo
									</>
								)}
							</Link>
						</div>
						<SearchTable
							searchType={searchType}
							handleSearch={handleSearch}
							label={label}
						/>
					</div>
					
				)}
				<div className='bottomTable'>
					<table className='dataTable'>
						<thead>
							<tr>
								{columns.map((column) => (
									<th key={column}>{column}</th>
								))}
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{dataTable.length > 0 ? (
								dataTable.map((row: any, index: number) => (
									<tr key={index}>
										{dbColumns?.map((column: string) =>
											column === 'id' ? (
												<td key={column} className='id'>
													{index + 1}
												</td>
											) : (
												<td key={column}>{row[column]}</td>
											)
										)}
										<td className='dataTable__actions'>
											{editButton && (
												<Button
													key={index}
													text={'editar'}
													onClick={() => navigate(`${editLink}/${row._id}`)}
													fill={true}
												/>
											)}
											<Button
												key={index + row._id}
												text={'eliminar'}
												onClick={() => deleteFunction(row._id)}
												fill={false}
											/>
											{buttonsActions?.map((button: any) => (
												<Button
													key={index + row._id + button.text}
													text={button.text}
													onClick={button.onClick}
													fill={button.fill}
												/>
											))}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={columns.length + 1}>No hay datos</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};


	
  
