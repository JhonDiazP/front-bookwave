import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FileUploadEvent } from 'primeng/fileupload';
import { ContractTypesService } from 'src/app/business-controller/contract-types.service';
import { DocumentTypeService } from 'src/app/business-controller/document-type.service';
import { GenderService } from 'src/app/business-controller/gender.service';
import { PositionService } from 'src/app/business-controller/position.service';
import { ProjectService } from 'src/app/business-controller/project.service';
import { TerritoriesService } from 'src/app/business-controller/territories.service';
import { UserService } from 'src/app/business-controller/user.service';
import { ContractType } from 'src/app/models/contract-type';
import { DocumentType } from 'src/app/models/document-type';
import { Gender } from 'src/app/models/gender';
import { Position } from 'src/app/models/position';
import { Project } from 'src/app/models/project';
import { Country } from 'src/app/models/territories/country';
import { Municipality } from 'src/app/models/territories/municipality';
import { Region } from 'src/app/models/territories/region';

@Component({
  selector: 'app-form-users',
  standalone: false,
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.scss'
})
export class FormUsersComponent implements OnInit {

  public userForm: FormGroup;
  public genders!: Gender[];
  public documentTypes!: DocumentType[];
  public projects!: Project[];
  public positions!: Position[];
  public contractTypes!: ContractType[];
  public countries!: Country[];
  public regions!: Region[];
  public municipalities!: Municipality[];
  public msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private territoriesService: TerritoriesService,
    private documentTypeService: DocumentTypeService,
    private genderService: GenderService,
    private userService: UserService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private positionService: PositionService,
    private contractTypeService: ContractTypesService
  ) {
    this.userForm = this.fb.group({
      document_type_id: ['', Validators.required],
      document: ['', [Validators.required]],
      firstname: ['', Validators.required],
      middlelastname: [''],
      lastname: ['', Validators.required],
      middlefirstname: [''],
      country: ['', Validators.required],
      region: ['', Validators.required],
      municipality_id: ['', Validators.required],
      gender_id: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      project_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirmed: ['', [Validators.required,]],
      contract_type_id: ['', [Validators.required]],
      contract_no: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      date_finish: [''],
      status: [true]
    },
    {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.getDocumentTypes();
    this.getGenders();
    this.getProjects();
    this.getPosition();
    this.getContractTypes();
  }

  getDocumentTypes() {
    this.documentTypeService.getDocumentTypes().then(documentTypes => {
      this.documentTypes = documentTypes;
    }).catch(x => {

    })
  }

  getGenders() {
    this.genderService.getGenders().then(genders => {
      this.genders = genders;
    }).catch(x => {

    })
  }

  getProjects(){
    this.projectService.getProjects().then(projects => {
      this.projects = projects;
    }).catch(x => {

    })
  }

  getPosition(){
    this.positionService.getPositions().then(positions => {
      this.positions = positions;
    }).catch(x => {

    })
  }

  getContractTypes(){
    this.contractTypeService.getContractTypes().then(contractTypes => {
      this.contractTypes = contractTypes;
    }).catch(x => {

    })
  }

  getCountries(){
    this.territoriesService.getCountry().then(countries => {
      this.countries = countries;
    }).catch(x => {

    })
  }

  getRegionsByCountry(event: DropdownChangeEvent){
    this.territoriesService.getRegion({country_id: event.value}).then(regions => {
      this.regions = regions;
    }).catch(x => {

    })
  }

  getMunicipalitiesByRegion(event: DropdownChangeEvent){
    this.territoriesService.getMunicipalities({region_id: event.value}).then(municipalities => {
      this.municipalities = municipalities;
    }).catch(x => {

    })
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userService.Save(this.userForm.value).then(response => {
        this.messageService.add({ key: 'tst', severity: 'success', summary: "Usuario creado", detail: response.message });
        this.refreshData();
      }).catch((error) => {
        let errorMessage = 'Ocurrió un error inesperado'; // Mensaje por defecto
        // Verificamos si hay un objeto 'errors' en la respuesta de error
        if (error.error?.errors) {
          // Recorremos todas las claves del objeto 'errors' (puede haber errores de varios campos)
          errorMessage = Object.keys(error.error.errors)
            .map(key => error.error.errors[key].join(' ')) // Concatenamos los mensajes de error
            .join(' '); // Unimos los mensajes en un solo string
        } else if (error.error?.message) {
          // Si solo hay un mensaje general
          errorMessage = error.error.message;
        }
        // Mostramos todos los mensajes de error
        this.messageService.add({ key: 'tst', severity: 'error', summary: "Error", detail: errorMessage });
      });
    } else {
      this.messageService.add({ key: 'tst', severity: 'warn', summary: "Atención", detail: "Complete los campos requeridos" });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      // Reglas de validación
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumber = /\d+/.test(value);
      const hasSpecialCharacter = /[@$!%*?&+]+/.test(value);
      const isValidLength = value.length >= 8;

      const errors: ValidationErrors = {};

      // Generar los errores individuales
      if (!hasUpperCase) {
        errors['uppercase'] = 'Debe contener al menos una letra mayúscula.';
      }

      if (!hasLowerCase) {
        errors['lowercase'] = 'Debe contener al menos una letra minúscula.';
      }

      if (!hasNumber) {
        errors['number'] = 'Debe contener al menos un número.';
      }

      if (!hasSpecialCharacter) {
        errors['specialCharacter'] = 'Debe contener al menos un carácter especial (@$!%*?&+).';
      }

      if (!isValidLength) {
        errors['minLength'] = 'Debe tener al menos 8 caracteres.';
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordConfirmed = form.get('passwordConfirmed')?.value;

    return password === passwordConfirmed ? null : { passwordMismatch: 'Las contraseñas no coinciden' };
  }

  refreshData(){
    this.userForm.reset();
    this.userForm.controls['status'].setValue(true);
  }

}
