drop table acl_class;
drop table acl_entry;
drop table acl_object_identity;
drop table acl_sid;
drop table t_opcion_menu;
drop table t_r_usuario_rol;
drop table t_rol_seguridad;
drop table t_usuario_seguridad;

CREATE TABLE acl_sid (
    id serial NOT NULL,
    principal boolean NOT NULL,
    sid varchar(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (sid,principal) CONSTRAINT unique_uk_1
);

CREATE TABLE acl_class (
    id serial NOT NULL,
    class varchar(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (class) CONSTRAINT unique_uk_2
);

CREATE TABLE acl_object_identity (
    id serial NOT NULL,
    entries_inheriting boolean NOT NULL,
    object_id_identity integer NOT NULL,
    object_id_class integer NOT NULL,
    parent_object integer,
    owner_sid integer,
    PRIMARY KEY (id),
    UNIQUE (object_id_class,object_id_identity) CONSTRAINT unique_uk_3,
    FOREIGN KEY (parent_object) REFERENCES acl_object_identity(id) CONSTRAINT foreign_fk_1,
    FOREIGN KEY (object_id_class) REFERENCES acl_class(id) CONSTRAINT foreign_fk_2,
    FOREIGN KEY (owner_sid) REFERENCES acl_sid(id) CONSTRAINT foreign_fk_3
);

CREATE TABLE acl_entry (
    id serial NOT NULL,
    ace_order integer NOT NULL,
    audit_failure boolean NOT NULL,
    audit_success boolean NOT NULL,
    granting boolean NOT NULL,
    mask integer NOT NULL,
    acl_object_identity integer NOT NULL,
    sid integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (acl_object_identity,ace_order) CONSTRAINT unique_uk_4,
    FOREIGN KEY (acl_object_identity) REFERENCES acl_object_identity(id) CONSTRAINT foreign_fk_4,
    FOREIGN KEY (sid) REFERENCES acl_sid(id) CONSTRAINT foreign_fk_5
);

CREATE TABLE t_opcion_menu (
    id_t_opcion integer NOT NULL,
    v_descripcion varchar(120) NOT NULL,
    v_opcion varchar(80) NOT NULL,
    v_url varchar(200),
    id_t_opcion_padre integer,
    PRIMARY KEY (id_t_opcion),
    FOREIGN KEY (id_t_opcion) REFERENCES t_opcion_menu(id_t_opcion) CONSTRAINT foreign_menu_opc_menu_menu
);

CREATE TABLE t_usuario_seguridad (
    id_t_usuario serial NOT NULL,
    v_username varchar(50) NOT NULL,
    v_password varchar(25) NOT NULL,
    v_nombre_usuario varchar(100) NOT NULL,
    l_usuario_activo boolean DEFAULT 'T' NOT NULL,
    PRIMARY KEY (id_t_usuario),
    UNIQUE (v_username) CONSTRAINT unique_uk_7

);

CREATE TABLE t_rol_seguridad (
    id_t_rol integer NOT NULL,
    v_rol varchar(30) NOT NULL,
    l_rol_activo boolean DEFAULT 'T' NOT NULL,
    PRIMARY KEY (id_t_rol),
    UNIQUE (v_rol) CONSTRAINT unique_uk_6
);

CREATE TABLE t_r_usuario_rol (
    id_tr_usuario integer NOT NULL,
    id_tr_rol integer NOT NULL,
    PRIMARY KEY (id_tr_usuario, id_tr_rol),
    FOREIGN KEY (id_tr_rol) REFERENCES t_rol_seguridad(id_t_rol) CONSTRAINT fk_r_usu_rol_rol_seg,
    FOREIGN KEY (id_tr_usuario) REFERENCES  t_usuario_seguridad(id_t_usuario) CONSTRAINT fk_r_usu_t_usu_seg
);



INSERT INTO acl_class VALUES (1, 'mx.gob.sep.dgtec.seguridad.modelo.ModuloMenu');
INSERT INTO acl_class VALUES (2, 'mx.gob.sep.dgtec.seguridad.modelo.OpcionMenu');

INSERT INTO acl_sid VALUES (1, 'F', 'ROLE_USUARIO');
INSERT INTO acl_sid VALUES (2, 'F', 'ROLE_USUARIO2');
INSERT INTO acl_sid VALUES (3, 'F', 'ROLE_ADMINISTRADOR');

insert into acl_object_identity (id, entries_inheriting, object_id_identity, object_id_class, parent_object, owner_sid) values (1, 'T', 1, 1, null, 3);
insert into acl_object_identity (id, entries_inheriting, object_id_identity, object_id_class, parent_object, owner_sid) values (3, 'T', 8, 1, null, 3);
insert into acl_object_identity (id, entries_inheriting, object_id_identity, object_id_class, parent_object, owner_sid) values (2, 'T', 9, 1, null, 3);
insert into acl_object_identity (id, entries_inheriting, object_id_identity, object_id_class, parent_object, owner_sid) values (4, 'T', 10, 1, null, 3);


insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (1, 1, 'T', 'T', 'T', 1, 1, 3);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (2, 1, 'T', 'T', 'T', 1, 2, 3);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (3, 1, 'T', 'T', 'T', 1, 3, 3);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (4, 2, 'T', 'T', 'T', 1, 1, 1);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (5, 2, 'T', 'T', 'T', 1, 2, 1);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (6, 2, 'T', 'T', 'F', 1, 3, 1);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (7, 3, 'T', 'T', 'F', 1, 1, 2);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (8, 3, 'T', 'T', 'T', 1, 2, 2);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (9, 3, 'T', 'T', 'F', 1, 3, 2);
insert into acl_entry (id, ace_order, audit_failure, audit_success, granting, mask, acl_object_identity, sid) values (10, 1, 'T', 'T', 'T', 1, 4, 3);

INSERT INTO t_usuario_seguridad VALUES (1, 'pi', 'pipo', 'Alejandro Pimentel', 'T');
INSERT INTO t_usuario_seguridad VALUES (2, 'brian', 'briantu', 'Brian Hernandez', 'T');
INSERT INTO t_usuario_seguridad VALUES (3, 'carlos', 'freeman', 'Carlos Urbina', 'T');

INSERT INTO t_rol_seguridad VALUES (2, 'ROLE_USUARIO2', 'T');
INSERT INTO t_rol_seguridad VALUES (3, 'ROLE_ADMINISTRADOR', 'T');
INSERT INTO t_rol_seguridad VALUES (1, 'ROLE_USUARIO', 'T');

INSERT INTO t_r_usuario_rol VALUES (1, 3);
INSERT INTO t_r_usuario_rol VALUES (3, 2);
INSERT INTO t_r_usuario_rol VALUES (2, 1);
INSERT INTO t_r_usuario_rol VALUES (2, 2);

insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (2, 'Captura de Sesiones y Asambleas', 'Registro de Sesiones y Asambleas', '/reuniones/reuniones', 1);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (4, 'Exportar Seiones y Asambleas', 'Exportar Sesiones y Asambleas', '/reuniones/exportar', 1);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (3, 'Importar Sesiones y Asambleas', 'Importar de Sesiones y Asambleas', '/reuniones/importar', 1);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (8, 'Administración de catálogos', 'Administración de catálogos', ' (null)', null);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (9, 'Consejos Municipales', 'Consejos Municipales', ' (null)', null);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (1, 'Sesiones y Asambleas', 'Sesiones y Asambleas', null, null);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (10, 'Administración de contraseñas', 'Administración de contraseñas', null, null);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (7, 'Gráficas', 'Gráficas', null, 5);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (6, 'Reportes', 'Reportes', null, 5);
insert into t_opcion_menu (id_t_opcion, v_descripcion, v_opcion, v_url, id_t_opcion_padre) values (5, 'Reportes y Gráficas', 'Reportes y Gráficas', null, null);

