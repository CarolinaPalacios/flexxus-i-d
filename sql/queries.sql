-- Dada la siguiente base de datos relacional: RESUELVA LAS SIGUIENTES CONSULTAS EN SQL:

-- • Mostrar los nombres de los empleados ordenados alfabéticamente (Z...A)

SELECT NOMBRES FROM EMPLEADOS ORDER BY NOMBRES DESC;

-- • Seleccionar el nombre, el puesto y la localidad donde trabajan los empleados con puesto de ‘Soporte’.

SELECT E.NOMBRES, P.PUESTO, L.LOCALIDAD
FROM EMPLEADOS E
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE P.PUESTO = 'Soporte';

-- • Listar los nombres de los empleados cuyo nombre termine con la letra ‘o’.

SELECT NOMBRES FROM EMPLEADOS WHERE NOMBRES LIKE '%o';

-- • Seleccionar el nombre, el puesto y sueldo de los empleados que trabajan en la localidad Carlos Paz.

SELECT E.NOMBRES, P.PUESTO, E.SUELDO
FROM EMPLEADOS E
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE L.LOCALIDAD = 'Carlos Paz';

-- • Seleccionar el nombre, sueldo y localidad donde trabajan de los empleados que tengan un sueldo entre 10000 y 13000.

SELECT E.NOMBRES, E.SUELDO, L.LOCALIDAD
FROM EMPLEADOS E
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE E.SUELDO BETWEEN 10000 AND 13000;

-- • Visualizar los departamentos con más de 5 empleados

SELECT D.DENOMINACION
FROM DEPARTAMENTOS D
JOIN (
  SELECT DEPARTAMENTO_ID, COUNT(*) AS CANTIDAD 
  FROM EMPLEADOS GROUP BY 
  DEPARTAMENTO_ID
  ) AS C ON D.ID = C.DEPARTAMENTO_ID
WHERE C.CANTIDAD > 5;
-- • Nombre de los empleados que trabajan en Córdoba y cuyo puesto sea ‘Analista’ o ‘Programador’.

SELECT E.NOMBRES
FROM EMPLEADOS E
JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
WHERE L.LOCALIDAD = 'Córdoba' AND (P.PUESTO = 'Analista' OR P.PUESTO = 'Programador');

-- • Calcula el sueldo medio de todos los empleados.

SELECT AVG(SUELDO) FROM EMPLEADOS;

-- • ¿Cuál es el máximo sueldo de los empleados del departamento 10?

SELECT MAX(SUELDO) FROM EMPLEADOS WHERE DEPARTAMENTO_ID = 10;

-- • Calcula el sueldo mínimo de los empleados del departamento ‘Soporte’.

SELECT MIN(SUELDO) 
FROM EMPLEADOS
JOIN DEPARTAMENTOS D ON EMPLEADOS.DEPARTAMENTO_ID = D.ID
WHERE D.DENOMINACION = 'Soporte';


-- • Para cada puesto obtener la suma de sueldos.

SELECT P.PUESTO, SUM(E.SUELDO) AS SUMA
FROM EMPLEADOS E
JOIN PUESTOS P ON E.PUESTO_ID = P.ID
GROUP BY P.PUESTO;