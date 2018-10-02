insert into ce_inf_gral (c_cct, fch_integracion, periodo, fch_actualizacion, status_ce, modificaciones, nom_file_acta, modalidad) values (100, TO_DATE('2012-11-08', '%Y-%m-%d'), '2012-2014', TO_DATE('2013-04-17', '%Y-%m-%d'), 4, 0, null, null);

insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 1, 11, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 1, 13, 'OTRA ACTIVIDAD');
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 2, 21, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 2, 22, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 2, 23, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 2, 24, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 2, 25, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 3, 32, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 5, 51, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 5, 52, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 5, 53, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 61, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 62, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 63, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 64, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 65, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 6, 66, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 7, 71, null);
insert into ce_act_sesion (c_cct, c_sesion, c_actividad, nom_otra_actividad) values (100, 7, 72, null);



insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 5, TO_DATE('2013-01-09', '%Y-%m-%d'), '09:00', '14:00', 12, 'Esta es una prueba de la tercera sesion', TO_DATE('2013-04-17', '%Y-%m-%d'), 'PI', 's/ZWsa8CwnfIOb0Wu11S', null);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 1, TO_DATE('2012-11-08', '%Y-%m-%d'), '10:00', '12:00', 23, 'CDSCDSCDS', TO_DATE('2013-04-17', '%Y-%m-%d'), 'PI', '0o0l17/h9IuQTFLA4aWI', null);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 2, TO_DATE('2012-11-09', '%Y-%m-%d'), '10:21', '10:22', 1, 'sadasdasdassdsdasdasd', TO_DATE('2013-04-17', '%Y-%m-%d'), 'PI', 'WDh1grSI48e4GnwuFKW5', true);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 3, TO_DATE('2011-12-31', '%Y-%m-%d'), '10:01', '12:01', 10, 'PRUEBA', TO_DATE('2012-01-01', '%Y-%m-%d'), 'PI', '53+5XsmzGj9e78XWFF9f', null);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 6, TO_DATE('2013-01-09', '%Y-%m-%d'), '09:00', '14:00', 12, 'Esta es una prueba de la cuarta sesion', TO_DATE('2013-04-17', '%Y-%m-%d'), 'PI', 'aYDDl5wOu8tHcImvUA5X', null);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 7, TO_DATE('2013-01-09', '%Y-%m-%d'), '09:00', '14:00', 12, 'Esta es una prueba de la tercera asamblea', TO_DATE('2013-04-17', '%Y-%m-%d'), 'PI', 'aYDDl5wOu8tHcImvUA5X', null);
insert into ce_sesion (c_cct, c_sesion, fch_sesion, hora_ini_sesion, hora_fin_sesion, num_integrantes, observaciones, fch_registro, usr_captura, cadena, ind_solicitud_mejora) values (100, 4, TO_DATE('2012-11-09', '%Y-%m-%d'), '10:21', '10:22', 1, 'sadasdasdassdsdasdasd', TO_DATE('2012-11-09', '%Y-%m-%d'), 'PI', 'KtNCwc3wKDRST/5sehwA', true);


insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 1, 'CDSCDSCS', 'DSCDSCDSC', 'ABUNDIO', 'cdscds@cdcd.com', '34567', TO_DATE('2013-01-23', '%Y-%m-%d'), 3, 1, 'M', 8, null, 1);
insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 2, 'CSDCDSCS', 'DSCDSCSD', 'NEPOMUCENO', 'email@dominio.com', '1234567', TO_DATE('2013-01-23', '%Y-%m-%d'), 3, 2, 'F', 2, null, 4);
insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 6, 'XASXSAXAS', 'XAXASXAS', 'EULOGIO', 'csdcsd@dcdc.com', '2345678', TO_DATE('2013-01-23', '%Y-%m-%d'), 3, 1, 'M', 3, null, 4);
insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 7, 'ROSAS', 'SANDOVAL', 'ISMAEL', 'ismael.rosas@dddd.com', '345678', TO_DATE('2013-01-23', '%Y-%m-%d'), 3, 2, 'M', 1, null, 1);
insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 8, 'VALENCIA', 'VERTIZ', 'CARLOS', 'carlos.valencia@dcdcd.com', '234567', TO_DATE('2013-01-23', '%Y-%m-%d'), 1, 1, 'M', 1, null, 1);
insert into ce_integrante (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, email_integrante, tel_integrante, fch_alta, c_cargo, c_niveleduc, genero, c_grado, c_nivel, c_calidad) values (100, 1, 9, 'MONTERO', 'LOPEZ', 'SOCORRO', 'cocotl@cdcd.com', '2345678', TO_DATE('2013-04-05', '%Y-%m-%d'), 2, 8, 'F', 1, null, 1);

insert into ce_comite_integrante (ce_integrante_comite_c_cct, ce_integrante_comite_c_sesion, ce_integrante_comite_csc_integrante, ce_comite_c_cct, ce_comite_c_sesion, ce_comite_c_comite) values (100, 2, 1, 100, 2, 1);

insert into ce_integrante_comite (c_cct, c_sesion, csc_integrante, paterno_integrante, materno_integrante, nombre_integrante, fch_alta, genero) values (100, 2, 1, 'XASXASXAS', '', 'ASXASXASX', TO_DATE('2013-04-17', '%Y-%m-%d'), null);

insert into ce_integrante_comite_consejo (c_cct_integrante, c_sesion_integrante, csc_integrante, c_cct_comite, c_sesion_comite, c_comite) values (100, 1, 1, 100, 2, 1);
insert into ce_integrante_comite_consejo (c_cct_integrante, c_sesion_integrante, csc_integrante, c_cct_comite, c_sesion_comite, c_comite) values (100, 1, 1, 100, 2, 5);
insert into ce_integrante_comite_consejo (c_cct_integrante, c_sesion_integrante, csc_integrante, c_cct_comite, c_sesion_comite, c_comite) values (100, 1, 2, 100, 2, 3);
insert into ce_integrante_comite_consejo (c_cct_integrante, c_sesion_integrante, csc_integrante, c_cct_comite, c_sesion_comite, c_comite) values (100, 1, 6, 100, 2, 2);
insert into ce_integrante_comite_consejo (c_cct_integrante, c_sesion_integrante, csc_integrante, c_cct_comite, c_sesion_comite, c_comite) values (100, 1, 8, 100, 2, 8);


insert into ce_comp_enlace (c_cct, c_sesion, c_comp_enlace, nom_otro_comp) values (100, 3, 1, null);
insert into ce_comp_enlace (c_cct, c_sesion, c_comp_enlace, nom_otro_comp) values (100, 3, 4, 'OTRO COMP');

insert into ce_evento (c_cct, c_sesion, c_evento, nom_otro_evento, ind_recurso, periodo_realizado, actividades, objetivo, monto, monto_str, actividades_fin, objetivo_fin) values (100, 5, 1, null, '1', '2012-2013', 'ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES', 'OBJETIVO FUTBOL', 1000.00, 'Mil pesos', 'ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES', 'OBJETIVO FUTBOL');
insert into ce_evento (c_cct, c_sesion, c_evento, nom_otro_evento, ind_recurso, periodo_realizado, actividades, objetivo, monto, monto_str, actividades_fin, objetivo_fin) values (100, 5, 2, null, '1', '2011-2012', 'ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES', 'OBJETIVO BASQUETBOL', 2000.00, 'Dos mil pesos', 'ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES', 'OBJETIVO BASQUETBOL');
insert into ce_evento (c_cct, c_sesion, c_evento, nom_otro_evento, ind_recurso, periodo_realizado, actividades, objetivo, monto, monto_str, actividades_fin, objetivo_fin) values (100, 5, 17, 'YOGA', '0', '2012-2013', 'ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES', 'OBJETIVO OTRO', null, null, null, null);


insert into ce_mejora_cct (c_cct, c_sesion, c_mejora_cct, nom_otra_mejora, periodo_inicio, actividades, monto, monto_str, metas_objetivos, actividades_fin, objetivo_fin, ind_recurso) values (100, 2, 9, null, '2010-2011 ', 'Las actividades del nueve', 1000.00, 'Mil pesos', 'Las metas  los objetivos del nueve', 'Las actividades del nueve', 'Las metas  los objetivos del nueve', '1');
insert into ce_mejora_cct (c_cct, c_sesion, c_mejora_cct, nom_otra_mejora, periodo_inicio, actividades, monto, monto_str, metas_objetivos, actividades_fin, objetivo_fin, ind_recurso) values (100, 2, 11, 'prueba', '2010-2012 ', 'Las actividades del once', 1000.00, 'Mil pesos', 'Las metas  los objetivos del once', 'Las actividades del once', 'Las metas  los objetivos del once', '1');

insert into ce_meta_enlace (c_cct, c_sesion, num_grado, num_materia, puntos_cct, pct_insuf, pct_elem, pct_bueno, pct_excel) values (100, 3, 31, 1, '300', '20', '20', '20', '40');

insert into ce_planeacion (c_cct, c_sesion, ind_planeacion, c_planeacion, nom_otro_planeacion, ind_participacion, actividades, ind_cumplio_planeacion) values (100, 2, true, 2, null, true, 'cdscsdcsdcsdcs', true);



insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 18, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 21, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 34, 'prueba', null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 41, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 45, 'prueba', null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 52, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 2, 54, 'prueba', null, null, null, null, null, null, null, null, null, null, null, null, null);
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 1, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Tener alumnos mejor preparados', null, 30000.00, 'Treinta mil pesos 00/100 MN', 50000, 'Las actividads modificadas', 'Objetivos finales', 1, null, 'Cincuenta mil pesos');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 4, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Mejorar el rendimiento de los alumnos', null, 30000.00, 'Treinta mil pesos 00/100 MN', 20000, 'Las actividads modificadas', 'Objetivos finales', 7, null, 'Dos mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 12, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Que los alumnos que tienen problemas en su vista tengan lentes.', null, 20000.00, 'Veinte mil pesos 00/100 MN', 10000, 'Las actividads modificadas', 'Objetivos finales', 8, 'Nos lo quedamos', 'Diez mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 20, null, '1', '2011      ', 'Planeacion, Organizacion, Direccion y Control', 'Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo', null, 5000.00, 'Cinco mil pesos 00/100 MN', 6000, null, null, 6, 'Donativo sorpresa', 'Seis mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 33, null, '1', '2011      ', 'Planeacion, Organizacion, Direccion y Control', 'Que los alumnos tengan salud para un mejor aprendizaje', null, 8000.00, 'Ocho mil pesos 00/100 MN', 9000, null, null, 6, 'Donativo sorpresa', 'Nueve mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 40, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace', null, 50000.00, 'Cincuenta mil pesos 00/100 MN', 60000, 'Las actividads modificadas', 'Objetivos finales', 1, null, 'Cincuenta mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 44, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Que los alumnos aprendan otro idioma', null, 50000.00, 'Cincuenta mil pesos 00/100 MN', 60000, 'Las actividads modificadas', 'Objetivos finales', 1, null, 'Sesenta mil pesos 00/100 MN');
insert into ce_programa (c_cct, c_sesion, c_programa, nom_otro_programa, ind_recurso, anio_ingreso, actividades, objetivo, nom_benefactor, monto, monto_str, monto_final, actividades_fin, objetivo_fin, c_diferencia, otra_diferencia, monto_final_str) values (100, 5, 50, null, '1', '2012      ', 'Planeacion, Organizacion, Direccion y Control', 'Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios', null, 25000.00, 'veinticinco mil pesos 00/100 MN', 26000, 'Las actividads modificadas', 'Objetivos finales', 1, null, 'Veintiseis mil pesos 00/100 MN');


insert into ce_recurso (c_cct, c_sesion, c_recurso, monto, monto_str, uso, especie, ind_recurso, ind_transparenta) values (100, 2, 0, 1000.00, 'mil pesos', null, 'cdscdscs', null, null);
insert into ce_recurso (c_cct, c_sesion, c_recurso, monto, monto_str, uso, especie, ind_recurso, ind_transparenta) values (100, 2, 1, 2342342.00, 'ewqewqeqwe', null, null, null, null);
insert into ce_recurso (c_cct, c_sesion, c_recurso, monto, monto_str, uso, especie, ind_recurso, ind_transparenta) values (100, 2, 3, 1000.00, 'Mil pesos', 'Contratacion de mano de obra', null, '1', true);


insert into cm_seguimiento (c_cct, c_sesion, ind_consejo_mun, ind_seg_enlace, acciones_seg, ind_apoyo, des_apoyo, ind_apoyo_gestion, des_apoyo_gestion, institucion_gestion, ind_consejo_est, ind_apoyo_prog) values (100, 5, '1', '1', 'ACIONES', '1', 'MUCHO APOYO MUNICIPAL', '1', 'MUCHO APOYO MUNICIPAL EN LA GESTION', 'INSTITUCION', '1', '1');





