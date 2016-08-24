/* SQL Meta Gen - SQL Utils
 * Copyright (C) 2016 Jeferson Boes
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

function trim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

function parseCreateFields (strFields)
{
    var fields = [];
    
    strFields = strFields.split('\n');

    for (var i = 0 ; i < strFields.length; i++) {
        
        var field = [];
        var line = strFields[i];
        line = trim(line);

        if (line == '')
            continue;

        line = line.split(',');

        for (var j = 0; j < line.length; j++) {
            if (line[j] != undefined) {
                var part = line[j];
                part = trim(part);
                field.push(part);
            }
        }

        fields.push(field);
    }

    return fields
 }

function createFields (tableName, tableOP, fieldOP, fields)
{
    var str = tableOP + ' table ' + tableName + '\n';

    if (tableOP == 'create')
        str = str + '(\n';

    var first = true;

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        var name = field[0];

        if (!first)
            str = str + ',\n';

        str = str + '  ';
            
        if (tableOP != 'create')
            str = str + fieldOP + ' ';

        str = str + name;

        if (fieldOP != 'drop')
            if (field[1] != undefined) {
                var typename = field[1];        
                str = str + ' ' + typename;
            }

        first = false;
    }

    if (tableOP == 'create')
        str = str + '\n)';

    return str
}
